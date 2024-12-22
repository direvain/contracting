import bodyParser from "body-parser";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import CompanyModelRegister from "../Models/registrationCompany.js"
import CompanyModel from "../Models/Company.js"     
import ensureAuthenticated from "../Middlewares/Auth.js"
import express from "express";
import jwt from "jsonwebtoken";
import cementOrder from "../Controllers/OrderController.js";
import SupplierModel from "../Models/Supplier.js";
import OrderModel from "../Models/Order.js";

const app = express();
app.use(bodyParser.json()); 
const CompanyRouter = express.Router();

// Login & Registration
CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

// ----------------------------- Admin -----------------------------
// fetch register company data 
CompanyRouter.get('/register', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModelRegister.find(); // Fetch all documents
        res.status(200).json([companies]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// fetch company data
CompanyRouter.get('/company-data', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModel.find(); // Fetch all documents
        res.status(200).json([companies]); // Send them as array 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// drop a company from collection "reject page's admin.js"
CompanyRouter.delete("/:id", async (req, res) => {
    try 
        {
            const ComapnyId = (req.params.id); 
            await CompanyModelRegister.deleteOne({ _id: ComapnyId });
            res.status(200).json({ message: "comapny  deleted successfully" });
        }
            catch (error) 
        {
                res.status(500).json({ error: "Failed to delete comapny" });
        }
});

// reject the request for company registration
CompanyRouter.patch("/request/reject/:id", async (req, res) => {
    try 
        {
            const ComapnyId = req.params.id; 
            await CompanyModelRegister.updateOne
            (
                { _id: ComapnyId },
                {state:"reject"}
            );
        res.status(200).json({ message: `Company reject successfully` });
        }
            catch (error) 
        {
                res.status(500).json({ error: `Failed to  reject Company` });
        }
});

// approve the request for company registration
CompanyRouter.patch("/approve/:id", async (req, res) => {
    try 
        {
            const companyId = req.params.id; // get the id of the company
            const companyData = await CompanyModelRegister.findById(companyId); // find the company by id
            
            // remove state from data "state" is a field in company collection  and ...dataWithoutState is name u give and this what will we use "
            const { state, ...dataWithoutState } = companyData.toObject();

            // for now we will update the state not delete " for now "
            await CompanyModelRegister.deleteOne({ _id: companyId });
            await CompanyModel.create(dataWithoutState);
            res.status(200).json({ message: `Company approve successfully` });
        }
        catch (error) 
        {
                res.status(500).json({ error: `Failed to  approve Company` });
        }
    });
    
// ----------------------------- Cement -----------------------------
// cement order
CompanyRouter.post('/cement-order', ensureAuthenticated, cementOrder);

// Get commercialRegister Data in Collection Companies 
CompanyRouter.get('/company-commercial-register', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const companyCommercialRegister = await CompanyModel.findOne({ _id: id })
        if (!companyCommercialRegister) return res.status(404).json({ message: 'Commercial register not found', success: false });
        res.json(companyCommercialRegister.commercialRegister);
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
                const fromDateTime = new Date(fromDate).setHours(0, 0, 0, 0);
                query.deliveryTime.$gte = new Date(fromDateTime).toLocaleString('en-GB', {hour12: true}).replace(',', '');
            }
            if (toDate) {
                const toDateTime = new Date(toDate).setHours(23, 59, 59, 999);
                query.deliveryTime.$lte = new Date(toDateTime).toLocaleString('en-GB', {hour12: true}).replace(',', '');
            }
        }

        const dataOrders = await OrderModel.find(query).sort({ deliveryTime: -1 });
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
                        price: item.price ,
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