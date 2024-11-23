import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyModel from "../Models/Company.js";
import env from "dotenv";

env.config();

const registration = async (req, res) => {
    try {
        const { companyName, email, username, password, companyPhone, commercialRegister } = req.body;
        const company = await CompanyModel.findOne({ username });
        if (company) {
            return res.status(409)
                .json({ message: 'Username is already exist', success: false });
        }
        const companyModel = new CompanyModel({ companyName, email, username, password, companyPhone, commercialRegister });
        companyModel.password = await bcrypt.hash(password, 10);
        await companyModel.save();
        res.status(201)
            .json({
                message: "Registration successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const company = await CompanyModel.findOne({ username });
        const errorMsg = 'Auth failed username or password is wrong';
        if (!company) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, company.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: company.email, _id: company._id, role: company.role }, // يحتوي على المعلومات التي تريد تضمينها
            process.env.JWT_SECRET, // هو مفتاح سري يستخدم لتوقيع الرمز
            { expiresIn: '24h' } // optional ---> الرمز سينتهي بعد 24 ساعه من انشائه
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                role: company.role
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror:" + err,
                success: false
            })
    }
}

export { registration, login };
