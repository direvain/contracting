import express from "express";
import login from "../Controllers/AdminController.js";
import {loginValidation} from "../Middlewares/AdminValidation.js";

const AdminRouter = express.Router();

AdminRouter.post('/admin', loginValidation, login);

export default AdminRouter;