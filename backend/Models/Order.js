import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    // Common fields
    type: {
        type: String,
        required: true,
        enum: ['cement', 'concrete'], // يحدد أنواع الطلبات المدعومة
    },
    companyName: {
        type: String,
        required: true,
    },
    companyPhone: {
        type: String,
        required: true
    },
    recipientName:{
        type:String,
        required:true
    },
    recipientPhone:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:String,
        required:true
    },
    orderRequestTime:{
        type:String,
        required:true
    },
    status: {
        type: String,
        default: 'pending'
    },
    price: {
        type:Number,
        required:true
    },
    // Special fields in cement
    cementQuantity:{
        type:Number,
        required: function(){
            return this.type === 'cement';
        }
    },
    cementNumberBags:{
        type:Number,
        required: function(){
            return this.type === 'cement';
        }
    },
    // Special fields in concrete

    // others
    supplierId:{
        type:String,
        required:true
    },
    companyId:{
        type:String,
        required:true
    }
});

const OrderModel = mongoose.model('order', OrderSchema);

export default OrderModel;