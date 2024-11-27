import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
    companyPhone: {
        type: Number,
        required: true
    },
    commercialRegister: {
        type: Buffer,
        required: true
    },
    role: {
        type: String,
        default: 'company'
    },
    state:{
        type:String,
        default:"new"
    }
});
const CompanyModel = mongoose.model('company', CompanySchema);



export default asd;