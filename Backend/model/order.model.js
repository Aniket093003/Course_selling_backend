import mongoose from 'mongoose';

const orderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    purchaseDate: { 
        type: Date, 
        default: Date.now 
    },
    amountPaid: { 
        type: Number, 
        required: true 
    },
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
