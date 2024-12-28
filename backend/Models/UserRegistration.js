import mongoose from 'mongoose';

const UserRegister = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    commercialRegister: {
        type: Buffer, // Store the file as binary data
        // contentType: String, // Store the MIME type (e.g., application/pdf)
        required: true
    },
    role: {
        type: String,
        enum: ['supplier', 'company'],
        required: true
    },
    status: {
        type:String,
        default:"new"
    },
    supplierProduct: {
        type: String,
        required: function () 
        {
            return this.role === 'supplier'; // Only required for suppliers
        },
    },
    adminID:{
        type: String,
        default:"none"
    }
    
});


const RegisterModel = mongoose.model('UserRegister', UserRegister);



export default RegisterModel ;
    