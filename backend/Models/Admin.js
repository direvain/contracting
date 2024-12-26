import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    }
});

AdminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const AdminModel = mongoose.model('admin', AdminSchema);
<<<<<<< HEAD
// const ad = new AdminModel({
//     email: 'admin@gmail.com',
//     password: 'admin123',
//     });
//     ad.save()
=======

const admin = new AdminModel({
    email: "abc@gmail.com",
    password: "12345678"
});

>>>>>>> a0d0680a25b849a6c6b0ed93a5f95645b20382fb
export default AdminModel;