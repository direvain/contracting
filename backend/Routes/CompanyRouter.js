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
        if (!companyCommercialRegister) return res.status(404).json({ message: 'Commercial register not found' });
        res.json(companyCommercialRegister.commercialRegister);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get Price in Collection Supplier - in bill
CompanyRouter.get('/data-supplier', ensureAuthenticated, async (req, res) => {
    try {
        const dataSupplier = await SupplierModel.find({ supplierProduct: 'cement' });
        if (!dataSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(dataSupplier.map( item => {
            return {
                supplierId: item._id,
                supplierName: item.supplierName,
                price: item.price,
            }
        }));
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get All Data in Collection CementOrder
CompanyRouter.get('/data-cement-order', ensureAuthenticated, async (req, res) => {
    try {
        const dataCementOrder = await OrderModel.find();
        if (!dataCementOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(dataCementOrder);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});


export default CompanyRouter;