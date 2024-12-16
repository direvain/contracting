import express from "express";
import bodyParser from "body-parser";
import { registration, login } from "../Controllers/SupplierController.js";
import { registrationValidation, loginValidation } from "../Middlewares/SupplierValidation.js";
import SupplierModelRegister from "../Models/registrationSupplier.js"
import SupplierModel from "../Models/Supplier.js";
import ensureAuthenticated from "../Middlewares/Auth.js"
const SupplierRouter = express.Router();


SupplierRouter.post('/login', loginValidation, login);
SupplierRouter.post('/registration', registrationValidation, registration);
// fetch register supplier data 
SupplierRouter.get('/register', ensureAuthenticated, async (req, res) => {
    try {
        const suppliers = await SupplierModelRegister.find(); // Fetch all documents
        res.status(200).json([suppliers]); // Send them as array 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});
// fetch supplier data
SupplierRouter.get('/supplierData', ensureAuthenticated, async (req, res) => {
    try {
        const suppliers = await SupplierModel.find(); // Fetch all documents
        res.status(200).json([suppliers]); // Send them as array 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// drop a supplier from collection "reject page's admin.js"
SupplierRouter.delete("/:id", async (req, res) => {
    try 
        {
            const SupplierId = (req.params.id); 
            await SupplierModelRegister.deleteOne({ _id: SupplierId });
            res.status(200).json({ message: "Supplier deleted successfully" });
        }
            catch (error) 
        {
                res.status(500).json({ error: "Failed to delete supplier" });
        }
});

// reject the request for supplier registration
SupplierRouter.patch("/request/reject/:id", async (req, res) => {
    try 
        {
            const SupplierId = req.params.id; 
            await SupplierModelRegister.updateOne
            (
                { _id: SupplierId },
                {state:"reject"}
            );
        res.status(200).json({ message: `Supplier reject successfully` });
        }
            catch (error) 
        {
                res.status(500).json({ error: `Failed to  reject supplier` });
        }
});

// approve the request for company registration
SupplierRouter.patch("/approve/:id", async (req, res) => {
    try 
        {
            const SupplierId = req.params.id; 
            const SupplierData = await SupplierModelRegister.findById(SupplierId); // find the supplier by id
            // remove state from data "state" is a field in supplier collection  and ...dataWithoutState is name u give and this what will we use "
            const { state, ...dataWithoutState } = SupplierData.toObject();

            await SupplierModelRegister.deleteOne({ _id: SupplierId });
            await SupplierModel.create(dataWithoutState);
            res.status(200).json({ message: `Supplier approve successfully` });
        }
            catch (error) 
        {
                res.status(500).json({ error: `Failed to  approve supplier` });
        }
});

export default SupplierRouter;