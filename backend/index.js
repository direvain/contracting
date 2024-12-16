import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import AdminRouter from "./Routes/AdminRouter.js";
import SupplierRouter from "./Routes/SupplierRouter.js";
import CompanyRouter from "./Routes/CompanyRouter.js";
import cors from "cors";

import './Models/db.js';

const app = express();
env.config();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

app.use("/auth", AdminRouter);
app.use("/auth/supplier", SupplierRouter);
app.use("/auth/company", CompanyRouter);
<<<<<<< HEAD
=======

>>>>>>> a5572ed6e3751fba9d15c732b6f9bd7c5846724d

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});