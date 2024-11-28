import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js"
import SupplierModelRegister from "../Models/registrationSupplier.js"
import CompanyModelRegister from "../Models/registrationCompany.js"

const ProductRouter = express.Router();

ProductRouter.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const suppliers = await SupplierModelRegister.find(); // Fetch all documents
        const companies = await CompanyModelRegister.find(); // Fetch all documents
        res.status(200).json([suppliers , companies]); // Send them as array 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default ProductRouter;