import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyModel from "../Models/Company.js";
import CompanyModelRegister from "../Models/registrationCompany.js";
import env from "dotenv";

env.config();

const registration = async (req, res) => {
    try {
        const { companyName, email, companyID, password, companyPhone, commercialRegister } = req.body;
        const checkCompany = await CompanyModel.findOne({
            $or: [{ companyName }, { companyID }]
        });

        if (checkCompany) {
            return res.status(406)
                .json({ message: 'Company is already exist', success: false });
        }
        const newUser = new RegisterModel({ companyName, email, username, password, companyPhone, commercialRegister, role }); // const and password and save change it for what u want adn the new is name for the collection so change it 

        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201)
            .json({
                message: "Registration successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error" + err.message,
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { companyID, password } = req.body;
        const company = await CompanyModel.findOne({ companyID });
        const errorMsg = 'Auth failed companyID or password is wrong';
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
            { companyName: company.companyName, email: company.email, companyID: company.companyID, companyPhone: company.companyPhone, role: company.role, _id: company._id,}, // يحتوي على المعلومات التي تريد تضمينها
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
