import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js"

const ProductRouter = express.Router();

ProductRouter.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            message: "Welcome User"
        }
    ])
});

export default ProductRouter;