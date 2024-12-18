import express from "express";
import jwt from "jsonwebtoken";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import cementOrder from "../Controllers/OrderController.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
import CompanyModel from "../Models/Company.js";
import SupplierModel from "../Models/Supplier.js";
import OrderModel from "../Models/Order.js";

const CompanyRouter = express.Router();

// Login & Registration
CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

// ----------------------------- Concrete -----------------------------


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
        const dataSupplier = await SupplierModel.find({ supplierProduct: 'cement' });
        if (!dataSupplier) return res.status(404).json({ message: 'Supplier not found', success: false });
        res.json(dataSupplier.map( item => {
            return {
                supplierId: item._id,
                supplierName: item.supplierName,
                price: item.price,
            }
        }));
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});

// Define a route to handle PATCH requests for updating a cement order
CompanyRouter.patch('/update-cement-order', ensureAuthenticated, async (req, res) => {
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
CompanyRouter.get('/order-cement-data', ensureAuthenticated, async (req, res) => {
    try {
        const statuses = req.query.statuses.split(',');
        const id = jwt.decode(req.headers.authorization)._id;
        const dataCementOrder = await OrderModel.find({ companyId: id, status: statuses });
        if (!dataCementOrder || dataCementOrder.length === 0) return res.status(404).json({ message: 'Order not found', success: false });

        // جلب بيانات المورد والشركة من قاعدة البيانات
        const supplierIds = dataCementOrder.map(item => item.supplierId);
        const dataSupplier = await SupplierModel.find({ _id: { $in: supplierIds } });
        const dataCompany = await CompanyModel.findById( id );

        // تحويل البيانات حسب الحاجة
        const result = dataCementOrder.map(item => {
            const supplier = dataSupplier.find(s => s._id.toString() === item.supplierId.toString());
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
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server errror: " + error.message, success: false });
    }
});


export default CompanyRouter;