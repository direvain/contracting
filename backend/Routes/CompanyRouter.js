import bodyParser from "body-parser";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import CompanyModel from "../Models/Company.js"     
import ensureAuthenticated from "../Middlewares/Auth.js"
import express from "express";
import jwt from "jsonwebtoken";
import cementOrder from "../Controllers/OrderController.js";
import SupplierModel from "../Models/Supplier.js";
import OrderModel from "../Models/Order.js";
import AdminModel from "../Models/Admin.js";
import {formidableTransformer} from "../Middlewares/FormidableTransformer.js";


const app = express();
app.use(bodyParser.json()); 
const CompanyRouter = express.Router();

// Login & Registration
CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

// ----------------------------- admin -----------------------------
// fetch company data
CompanyRouter.get('/companyData', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModel.find({},
        {  
            _id:1,
            companyName: 1,
            email: 1,
            companyID: 1,
            companyPhone: 1,
            commercialRegister: 1,
            adminID: 1
        }); 
        if (companies.length === 0){  return res.json({ error: "No data found" });        }

        const companyWithAdmin = await Promise.all(companies.map(async (data)=>{

            const admin = await AdminModel.findOne(
                { _id: data.adminID },
                { email: 1, }
            );
            return{
                _id:data._id,
                companyName:data.companyName,
                email:data.email,
                companyID:data.companyID,
                companyPhone:data.companyPhone,
                commercialRegister:data.commercialRegister,
                adminEmail: admin ? admin.email : null,
            
            }
        }))
        res.json(companyWithAdmin)


    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}); 

// delete company from collection 
CompanyRouter.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
    try 
        {
            const companyId = (req.params.id); 
            await CompanyModel.deleteOne({ companyID: companyId });
            res.status(200).json({ message: "company  deleted successfully" });
        }
            catch (error) 
        {
                res.status(500).json({ error: "Failed to delete company" });
        }
});

CompanyRouter.get('/admin-commercial-register/:id', ensureAuthenticated, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const company = await CompanyModel.findOne({companyID: id})
        if (!company) return res.status(404).json({message: 'Commercial register not found', success: false});
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=${company.companyName}.pdf`,
            }).send(company.commercialRegister) 
        } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// ----------------------------- Concrete -----------------------------


// ----------------------------- Cement -----------------------------
// cement order
CompanyRouter.post('/cement-order', ensureAuthenticated, cementOrder);

// Get commercialRegister Data in Collection Companies 


CompanyRouter.get('/company-commercial-register', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const company = await CompanyModel.findOne({_id: id})
        if (!company) return res.status(404).json({message: 'Commercial register not found', success: false});
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=${company.companyName}.pdf`,
            }).send(company.commercialRegister) 
        } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});
// Get Price in Collection Supplier - in CementOrder
CompanyRouter.get('/data-supplier', ensureAuthenticated, async (req, res) => {
    try {
        const supplierProducts = req.query.supplierProducts.split(',');
        
        const query = {};
        if (supplierProducts){
            query.supplierProduct = supplierProducts 
        }

        const dataSupplier = await SupplierModel.find(query);
        if (!dataSupplier) return res.status(404).json({ message: 'Supplier not found', success: false });
        res.json(dataSupplier.map( item => {
            return {
                supplierId: item._id,
                supplierName: item.supplierName,
                price: item.price,
                type: item.supplierProduct
            }
        }));
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Define a route to handle PATCH requests for updating a cement order
CompanyRouter.patch('/update-order-status', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.body;
        const { status } = req.body;
        const updateCementOrder = await OrderModel.findByIdAndUpdate(id, { status: status });
        if (!updateCementOrder) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Delete order in pending
CompanyRouter.delete('/order-delete/:id', ensureAuthenticated, async (req, res) => {
    try {
        const id  = req.params.id;
        const deleteOrder = await OrderModel.deleteOne({_id: id});
        if (!deleteOrder) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "", success: true });
    }catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Get All Data in Collection Order
CompanyRouter.get('/order-data', ensureAuthenticated, async (req, res) => {
    try {
        const statuses = req.query.statuses.split(',');
        const type = req.query.type;
        const supplierId = req.query.supplierId;
        const fromDate = req.query.fromDate;
        const toDate = req.query.toDate;
        const id = jwt.decode(req.headers.authorization)._id;

        var query = { companyId: id, status:  statuses  }

        if(type){
            query.type = type
        }
        if(supplierId){
            query.supplierId = supplierId
        }
        // إضافة فلتر التاريخ
        if (fromDate || toDate) {
            query.deliveryTime = {};
            if (fromDate) {
                query.deliveryTime.$gte = fromDate;
            }
            if (toDate) {
                query.deliveryTime.$lte = toDate;
            }
        }

        const dataOrders = await OrderModel.find(query).sort({ orderRequestTime: -1 });
        if (!dataOrders || dataOrders.length === 0) return res.json([]);;
        
        // جلب بيانات المورد والشركة من قاعدة البيانات
        const supplierIds = dataOrders.map(item => item.supplierId);
        const dataSupplier = await SupplierModel.find({ _id: { $in: supplierIds } });
        const dataCompany = await CompanyModel.findById( id );
        
        // تحويل البيانات حسب الحاجة
        const result = dataOrders.map(item => {
            const supplier = dataSupplier.find(s => s._id.toString() === item.supplierId.toString());
                if(item.type == 'cement'){
                    return {
                        id: item._id,
                        type: item.type,
                        recipientName: item.recipientName,
                        recipientPhone: item.recipientPhone,
                        location: item.location,
                        deliveryTime: item.deliveryTime,
                        orderRequestTime: item.orderRequestTime,
                        status: item.status,
                        price: item.price,
                        rejectionReason: item.rejectionReason,
                        cementQuantity: item.cementQuantity,
                        cementNumberBags: item.cementNumberBags,
                        supplierName: supplier.supplierName,
                        companyName: dataCompany.companyName,
                        companyPhone: dataCompany.companyPhone
                    };
                } else if(item.type == 'concrete'){
                    return {
                        id: item._id,
                        type: item.type,
                        recipientName: item.recipientName,
                        recipientPhone: item.recipientPhone,
                        location: item.location,
                        deliveryTime: item.deliveryTime,
                        orderRequestTime: item.orderRequestTime,
                        status: item.status,
                        price: item.price,
                        // field cocrete

                        supplierName: supplier.supplierName,
                        companyName: dataCompany.companyName,
                        companyPhone: dataCompany.companyPhone
                    };
                }
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});


// ----------------------------- Concrete -----------------------------


export default CompanyRouter;