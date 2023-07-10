import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { cartModel } from "../cart/cartModel.js";
import { productModel } from "../product/productModel.js";
import { orderModel } from "./orderModel.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCashOrder = catchError(async (request, response, next) => {
  //! [1] get card
  const cart = await cartModel.findById(request.params.id);
  if (!cart) return next(ErrorMessage(404, "You Have Not Cart Id"));
  //! [2] calculate total price
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  //! [3] create order
  const order = new orderModel({
    user: request.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: request.body.shippingAddress,
  });
  await order.save();
  //! [4] increment sold & decrement quantity

  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await productModel.bulkWrite(options);
    //! [5] clear user cart
    await cartModel.findByIdAndDelete(request.params.id);
    response.status(201).json({
      message: "Done",
      order,
    });
  }
});
const getUserOrder = catchError(async (request, response, next) => {
  let order = await orderModel
    .find({ user: request.user._id })
    .populate("cartItems.product");
  if (order) {
    response.status(200).json({
      message: "Done",
      order,
    });
  } else {
    response.status(200).json({
      message: "User Do Not Make Any Orders",
    });
  }
});
const getAllOrder = catchError(async (request, response, next) => {
  let order = await orderModel.find().populate("cartItems.product");
  if (order) {
    response.status(200).json({
      message: "Done",
      order,
    });
  } else {
    response.status(200).json({
      message: "No Order Yet",
    });
  }
});

const createCheckOutSession = catchError(async (request, response, next) => {
  const cart = await cartModel.findById(request.params.id);
  if (!cart) return next(ErrorMessage(404, "You Have Not Cart Id"));
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: request.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://www.google.com", //?Front End Path
    cancel_url: "https://www.youtupe.com", //?Front End Path
    customer_email: request.user.email,
    client_reference_id: request.params.id,
    metadata: request.body.shippingAddress,
  });
  response.status(200).json({
    message: "Done",
    session,
  });
});

export { createCashOrder, getUserOrder, getAllOrder, createCheckOutSession };
