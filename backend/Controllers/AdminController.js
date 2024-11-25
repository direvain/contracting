import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../Models/Admin.js";
import env from "dotenv";

env.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!admin) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, admin.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: admin.email, _id: admin._id, role: admin.role }, // يحتوي على المعلومات التي تريد تضمينها
            process.env.JWT_SECRET, // هو مفتاح سري يستخدم لتوقيع الرمز
            { expiresIn: '24h' } // optional ---> الرمز سينتهي بعد 24 ساعه من انشائه
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email, 
                role: admin.role
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror:" + err,
                success: false
            })
    }
}

export default login;