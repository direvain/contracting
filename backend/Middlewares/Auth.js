// للتحقق من هوية المستخدين

import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const ensureAuthenticated = (req, res, next) => {
    // التحقق من وجود رمز التوثيق
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
// التحقق من صحة الرمز
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

export default ensureAuthenticated;