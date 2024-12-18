import bodyParser from "body-parser";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import CompanyModelRegister from "../Models/registrationCompany.js"
import CompanyModel from "../Models/Company.js"     
import ensureAuthenticated from "../Middlewares/Auth.js"
import express from "express";
import jwt from "jsonwebtoken";
import cementOrder from "../Controllers/OrderController.js";
import SupplierModel from "../Models/Supplier.js";
import OrderModel from "../Models/Order.js";

const app = express();
app.use(bodyParser.json()); 
const CompanyRouter = express.Router();

// Login & Registration
CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);


// fetch register company data 
CompanyRouter.get('/register', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModelRegister.find(); // Fetch all documents
        res.status(200).json([companies]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// fetch company data
CompanyRouter.get('/companyData', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModel.find(); // Fetch all documents
        res.status(200).json([companies]); // Send them as array 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// drop a company from collection "reject page's admin.js"
CompanyRouter.delete("/:id", async (req, res) => {
    try 
        {
            const ComapnyId = (req.params.id); 
            await CompanyModelRegister.deleteOne({ _id: ComapnyId });
            res.status(200).json({ message: "comapny  deleted successfully" });
        }
            catch (error) 
        {
                res.status(500).json({ error: "Failed to delete comapny" });
        }
});

// reject the request for company registration
CompanyRouter.patch("/request/reject/:id", async (req, res) => {
    try 
        {
            const ComapnyId = req.params.id; 
            await CompanyModelRegister.updateOne
            (
                { _id: ComapnyId },
                {state:"reject"}
            );
        res.status(200).json({ message: `Company reject successfully` });
        }
            catch (error) 
        {
                res.status(500).json({ error: `Failed to  reject Company` });
        }
});

// approve the request for company registration
CompanyRouter.patch("/approve/:id", async (req, res) => {
    try 
        {
            const companyId = req.params.id; // get the id of the company
            const companyData = await CompanyModelRegister.findById(companyId); // find the company by id
            
            // remove state from data "state" is a field in company collection  and ...dataWithoutState is name u give and this what will we use "
            const { state, ...dataWithoutState } = companyData.toObject();

            // for now we will update the state not delete " for now "
            await CompanyModelRegister.deleteOne({ _id: companyId });
            await CompanyModel.create(dataWithoutState);
            res.status(200).json({ message: `Company approve successfully` });
        }
        catch (error) 
        {
                res.status(500).json({ error: `Failed to  approve Company` });
        }


    });
// ----------------------------- Concrete -----------------------------


// ----------------------------- Cement -----------------------------

// cement order
CompanyRouter.post('/cement-order', ensureAuthenticated, cementOrder);

// Get commercialRegister Data in Collection Companies 
CompanyRouter.get('/company-commercial-register', ensureAuthenticated, async (req, res) => {
    try {
        const id = jwt.decode(req.headers.authorization)._id;
        const companyCommercialRegister = await CompanyModel.findOne({ _id: id })
        if (!companyCommercialRegister) return res.status(404).json({ message: 'Commercial register not found' });
        res.json(companyCommercialRegister.commercialRegister);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get Price in Collection Supplier - in bill
CompanyRouter.get('/data-supplier', ensureAuthenticated, async (req, res) => {
    try {
        const dataSupplier = await SupplierModel.find({ supplierProduct: 'cement' });
        if (!dataSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.json(dataSupplier.map( item => {
            return {
                supplierId: item._id,
                supplierName: item.supplierName,
                price: item.price,
            }
        }));
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Get All Data in Collection Order
CompanyRouter.get('/order-data', ensureAuthenticated, async (req, res) => {
    try {
        const status = req.query.status;
        const id = jwt.decode(req.headers.authorization)._id;
        const dataCementOrder = await OrderModel.find({ companyId: id, status: status });
        if (!dataCementOrder || dataCementOrder.length === 0) return res.status(404).json({ message: 'Order not found' });

        // جلب بيانات المورد والشركة من قاعدة البيانات
        const supplierIds = dataCementOrder.map(item => item.supplierId);
        const companyIds = dataCementOrder.map(item => item.companyId);
        const dataSupplier = await SupplierModel.find({ _id: { $in: supplierIds } });
        const dataCompany = await CompanyModel.find({ _id: { $in: companyIds } });

        // تحويل البيانات حسب الحاجة
        const result = dataCementOrder.map(item => {
            const supplier = dataSupplier.find(s => s._id.toString() === item.supplierId.toString());
            const company = dataCompany.find(c => c._id.toString() === item.companyId.toString());
            return {
                ...item._doc, // للحصول على خصائص العنصر مع تجنب مشاكل المرجعية
                supplierName: supplier.supplierName,
                companyName: company.companyName,
                companyPhone: company.companyPhone
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default CompanyRouter;