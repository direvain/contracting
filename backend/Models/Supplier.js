import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    supplierPhone: {
        type: Number,
        required: true
    },
    supplierProduct: {
        type: String,
        required: true
    },
    commercialRegister: {
        type: Buffer,
        required: true
    },
    role: {
        type: String,
        default: 'supplier',
    }
});

const SupplierModel = mongoose.model('suppliers', SupplierSchema);

export default SupplierModel;