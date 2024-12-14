import express from "express";
import jwt from "jsonwebtoken";
import { registration, login } from "../Controllers/SupplierController.js";
import { registrationValidation, loginValidation } from "../Middlewares/SupplierValidation.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
import OrderModel from "../Models/Order.js";
import SupplierModel from "../Models/Supplier.js";
import CompanyModel from "../Models/Company.js";

const SupplierRouter = express.Router();

// Login & Registration
SupplierRouter.post('/login', loginValidation, login);
SupplierRouter.post('/registration', registrationValidation, registration);

// ----------------------------- Concrete -----------------------------


// ----------------------------- Cement -----------------------------

// Define a route to handle PATCH requests for updating a cement order
SupplierRouter.patch('/update-cement-order', ensureAuthenticated, async (req, res) => {
    try {
        const { orderId, status } = req.body;
        
        const updateCementOrder = await OrderModel.findByIdAndUpdate(orderId, { status: status });
        if (!updateCementOrder) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        res.status(200).json({ message: "", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server errror:" + error.message, success: false });
    }
});

// Get commercialRegister Data in Collection Supplier 
SupplierRouter.get('/supplier-data', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const supplierData = await SupplierModel.findOne({ _id: id })
        if (!supplierData) return res.status(404).json({ message: 'Supplier not found' });
        res.json({
            commercialRegister: supplierData.commercialRegister,
            price: supplierData.price
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get All Data in Collection CementOrder
SupplierRouter.get('/data-cement-order', ensureAuthenticated, async (req, res) => {
    try {
        // req.headers.authorization
        const dataCementOrders = await OrderModel.find();
        if (!dataCementOrders) return res.status(404).json({ message: 'Order not found' });
        CompanyModel.findById()
        res.json(dataCementOrders);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Define a route to handle PATCH requests for updating a cement price
SupplierRouter.patch('/update-cement-price', ensureAuthenticated, async (req, res) => {
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
        res.status(500).json({ message: "Internal server errror:" + error.message, success: false });
    }
});

export default SupplierRouter;
