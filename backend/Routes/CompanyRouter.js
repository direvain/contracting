  import express from "express";
import bodyParser from "body-parser";
import { registration, login } from "../Controllers/CompanyController.js";
import { registrationValidation, loginValidation } from "../Middlewares/CompanyValidation.js";
import CompanyModelRegister from "../Models/registrationCompany.js"
import CompanyModel from "../Models/Company.js"     
import ensureAuthenticated from "../Middlewares/Auth.js"

const app = express();
app.use(bodyParser.json()); 
const CompanyRouter = express.Router();

CompanyRouter.post('/login', loginValidation, login);
CompanyRouter.post('/registration', registrationValidation, registration);

// fetch register company data 
CompanyRouter.get('/register', ensureAuthenticated, async (req, res) => {
    try {
        const companies = await CompanyModelRegister.find(); // Fetch all documents
        res.status(200).json([companies]); // Send them as array 
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


export default CompanyRouter;