import mongoose from 'mongoose';

const UserRegister = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
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
    AdminEmail:{
        type: String,
        default:"none"
    }
    
});


const RegisterModel = mongoose.model('UserRegister', UserRegister);



export default RegisterModel ;




// const users = [
//     {
//         Name: "Company One",
//         email: "companyone@example.com",
//         Id: 123456789,
//         password: "password1",
//         Phone: 1234567890,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "company",
//         status: "new",
//     },

//  // Supplier entries (role: "supplier")
//     {
//         Name: "Supplier One",
//         email: "supplierone@example.com",
//         Id: 456789123,
//         password: "password4",
//         Phone: 1234567893,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "supplier",
//         status: "new",
//         supplierProduct: "cement",
//     },
//     {
//         Name: "Company Two",
//         email: "companytwo@example.com",
//         Id: 234567891,
//         password: "password2",
//         Phone: 1234567891,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "company",
//         status: "new",
//     },
//     {
//         Name: "Supplier Two",
//         email: "suppliertwo@example.com",
//         Id: 567891234,
//         password: "password5",
//         Phone: 1234567894,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "supplier",
//         status: "new",
//         supplierProduct: "concrete",
//     },
//     {
//         Name: "Company Three",
//         email: "companythree@example.com",
//         Id: 345678912,
//         password: "password3",
//         Phone: 1234567892,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "company",
//         status: "new",
// },
    
//     {
//         Name: "Supplier Three",
//         email: "supplierthree@example.com",
//         Id: 678912345,
//         password: "password6",
//         Phone: 1234567895,
//         commercialRegister: Buffer.from("Sample Commercial Register"),
//         role: "supplier",
//         status: "new",
//         supplierProduct: "cement",
//     },
// ];
// RegisterModel.insertMany(users);
