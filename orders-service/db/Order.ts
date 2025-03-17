import mongoose, { Schema, Document } from "mongoose";

const orderSchema = new Schema({
  commandNumber: { type: String, required: true },
});

interface Order extends Document {
  commandNumber: string;
}

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
