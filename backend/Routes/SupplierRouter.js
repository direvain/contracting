import express from "express";
import jwt from "jsonwebtoken";
import { registration, login } from "../Controllers/SupplierController.js";
import { registrationValidation, loginValidation } from "../Middlewares/SupplierValidation.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
import OrderModel from "../Models/Order.js";
import SupplierModel from "../Models/Supplier.js";
import CompanyModel from "../Models/Company.js";
import AdminModel from "../Models/Admin.js";

const SupplierRouter = express.Router();

// Login & Registration
SupplierRouter.post('/login', loginValidation, login);
SupplierRouter.post('/registration', registrationValidation, registration);



// ----------------------------- admin -----------------------------
// fetch supplier data
SupplierRouter.get('/supplierData', ensureAuthenticated, async (req, res) => {
    try 
    {
        const suppliers = await SupplierModel.find({},
            {
                _id: 1,
                supplierName:1,
                email: 1,
                supplierID:1,
                supplierPhone:1,
                supplierProduct:1,
                price:1,
                commercialRegister: 1,
                adminID: 1,
            });
        if(suppliers.length===0){            return res.json({ error: "No data found" });        }

        const suppliersWithAdmin = await Promise.all(suppliers.map(async (data) => {
            // Find admin email using adminID
            const admin = await AdminModel.findOne(
                { _id: data.adminID },
                { email: 1 }
            );

            return {
                _id: data._id,
                supplierName: data.supplierName,
                email: data.email,
                supplierID: data.supplierID,
                supplierPhone: data.supplierPhone,
                price: data.price,
                commercialRegister: data.commercialRegister,
                supplierProduct: data.supplierProduct,
                adminEmail: admin ? admin.email : null,
            };
        }));
        res.json(suppliersWithAdmin);
       } catch (error) 
    {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// delete supplier from collection 
SupplierRouter.delete("/delete/:id", ensureAuthenticated, async (req, res) => {
    try 
        {
            const supplierId = (req.params.id); 
            await SupplierModel.deleteOne({ supplierID: supplierId });
            res.status(200).json({ message: "supplier  deleted successfully" });
        }
            catch (error) 
        {
                res.status(500).json({ error: "Failed to delete supplier" });
        }
});

// ----------------------------- Concrete -----------------------------


// ----------------------------- Cement -----------------------------
// Define a route to handle PATCH requests for updating a cement order
SupplierRouter.patch('/update-order-status', ensureAuthenticated, async (req, res) => {
    try {
        const { id, status, rejectReason } = req.body;
        const updateCementOrder = await OrderModel.findByIdAndUpdate(id, { status: status, message: rejectReason });
        if (!updateCementOrder) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Get commercialRegister Data in Collection Supplier 
SupplierRouter.get('/supplier-data', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const supplierData = await SupplierModel.findOne({ _id: id })
        if (!supplierData) return res.status(404).json({ message: 'Supplier not found', success: false });
        res.json({
            commercialRegister: supplierData.commercialRegister,
            price: supplierData.price,
            supplierPhone: supplierData.supplierPhone,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Get All Data in Collection Order
SupplierRouter.get('/order-data', ensureAuthenticated, async (req, res) => {
    try {
        const statuses = req.query.statuses.split(',');
        const fromDate = req.query.fromDate;
        const toDate = req.query.toDate;
        const id = jwt.decode(req.headers.authorization)._id;

        var query = { supplierId: id, status:  statuses  }

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

        const dataCementOrders = await OrderModel.find(query).sort({ orderRequestTime: -1 });
        if (!dataCementOrders || dataCementOrders.length === 0) return res.json([]);
        
        // جلب بيانات المورد والشركة من قاعدة البيانات
        const companyIds = dataCementOrders.map(item => item.companyId);
        const dataSupplier = await SupplierModel.findById( id );
        const dataCompanies = await CompanyModel.find({ _id: { $in: companyIds } });
        
        // تحويل البيانات حسب الحاجة
        const result = dataCementOrders.map(item => {
            const company = dataCompanies.find(c => c._id.toString() === item.companyId.toString());
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
                rejectionReason: item.rejectionReason,
                cementQuantity: item.cementQuantity,
                cementNumberBags: item.cementNumberBags,
                supplierName: dataSupplier.supplierName,
                companyName: company.companyName,
                companyPhone: company.companyPhone
            };
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Define a route to handle PATCH requests for updating a cement price
SupplierRouter.patch('/update-price', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const { price } = req.body;
        
        const updateCementPrice = await SupplierModel.findByIdAndUpdate(id, { price: price });
        if (!updateCementPrice) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "Price has been updated", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// ----------------------------- Concrete -----------------------------

export default SupplierRouter;