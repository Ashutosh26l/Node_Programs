import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty:     { type: Number, required: true },
  price:   { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems:  [orderItemSchema],
    shippingAddress: {
      address: String, city: String, postalCode: String, country: String
    },
    paymentMethod: String,
    totalPrice: Number,
    isPaid:      { type: Boolean, default: false },
    paidAt:      Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
