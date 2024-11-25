import express from "express";
import { registration, login } from "../Controllers/SupplierController.js";
import { registrationValidation, loginValidation } from "../Middlewares/SupplierValidation.js";

const SupplierRouter = express.Router();

SupplierRouter.post('/login', loginValidation, login);
SupplierRouter.post('/registration', registrationValidation, registration);

export default SupplierRouter;