import express from "express";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";

const CompanyRouter = express.Router();

CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

export default CompanyRouter;