import OrderModel from '../Models/Order.js';
import SupplierModel from '../Models/Supplier.js';
import jwt from "jsonwebtoken";

const cementOrder = async (req, res) => {
    try{
        const {type, recipientName, recipientPhone, location, deliveryTime, orderRequestTime, cementQuantity, cementNumberBags, price, supplierName, supplierId, companyId} = req.body;
        const cementOrderModel = new OrderModel({type, recipientName, recipientPhone, location, deliveryTime, orderRequestTime, cementQuantity, cementNumberBags, price, supplierId, companyId})
        const supplier = await SupplierModel.findOne({supplierName});
        // get the user id from the token
        cementOrderModel.companyId = jwt.decode(req.headers.authorization)._id;
        cementOrderModel.supplierId = supplier._id;
        await cementOrderModel.save();
        res.status(201)
            .json({
                message: "Order successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error" +err,
                success: false
            })
    }
}

export default cementOrder;