import express from "express";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import ensureAuthenticated from "../Middlewares/Auth.js";
import CompanyModel from "../Models/Company.js";
import jwt from "jsonwebtoken";

const CompanyRouter = express.Router();

// Login & Registration
CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

// Get All Data in Collection Companies 
CompanyRouter.get('/data-company', ensureAuthenticated, async (req, res) => {
    try {
        console.log(jwt.decode(req.headers.authorization));
        console.log(jwt.decode(req.headers.authorization).id); // id of the user who is logged in
        const dataCompany = await CompanyModel.find().select("-password"); // password يستخدم لتحديد الحقول المراد إرجاعها من الاستعلام. هنا، يتم استثناء حقل
        if (!dataCompany) return res.status(404).json({ message: 'User not found' });
        res.json(dataCompany);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

export default CompanyRouter;