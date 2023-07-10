import mongoose from "mongoose";

const productInCart = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "product" },
  quantity: { type: Number, default: 1 },
  price: Number,
});

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    cartItems: [productInCart],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
  },
  { timestamps: true }
);

export const cartModel = mongoose.model("cart", cartSchema);
