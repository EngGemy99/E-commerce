import slugify from "slugify";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { totalPrice } from "../../utils/totalPrice.js";
import { cartModel } from "./cartModel.js";
import { productModel } from "../product/productModel.js";
import { couponModel } from "../coupon/couponModel.js";
const addProductToCart = catchError(async (request, response, next) => {
  //! [1] check if product is found
  const product = await productModel.findById(request.body.product);
  if (!product) return next(ErrorMessage(401, "Product Not Exist"));
  //! [2] check if user already have cart or not
  const isCartExist = await cartModel.findOne({ user: request.user._id });
  request.body.price = product.price;
  if (!isCartExist) {
    const isCartExist = new cartModel({
      user: request.user._id,
      cartItems: [request.body],
    });

    totalPrice(isCartExist);
    if (isCartExist.discount) {
      isCartExist.totalPriceAfterDiscount =
        isCartExist.totalPrice -
        (isCartExist.totalPrice * isCartExist.discount) / 100;
    }
    await isCartExist.save();
    return response.status(201).json({
      message: "add to cart        ",
      cart: isCartExist,
    });
  }
  console.log(request.body);
  //! [3] check if item already has in cart
  let item = isCartExist.cartItems.find((ele) => {
    return ele.product == request.body.product;
  });
  if (item) {
    item.quantity += 1;
  } else {
    isCartExist.cartItems.push(request.body);
  }
  if (isCartExist.discount) {
    isCartExist.totalPriceAfterDiscount =
      isCartExist.totalPrice -
      (isCartExist.totalPrice * isCartExist.discount) / 100;
  }
  totalPrice(isCartExist);
  await isCartExist.save();
  response.status(201).json({
    message: "add to cart",
    cart: isCartExist,
  });
});

//! to delete all copy of product
const removeAllCopyProductFromCart = catchError(
  async (request, response, next) => {
    let result = await cartModel.findOneAndUpdate(
      { user: request.user._id },
      { $pull: { cartItems: { product: request.params.product } } },
      { new: true }
    );
    if (!result) {
      return next(ErrorMessage(400, `Product Not Found  😥`));
    }
    if (result.discount) {
      console.log(result.totalPrice);
      result.totalPriceAfterDiscount =
        result.totalPrice - (result.totalPrice * result.discount) / 100;
    }
    totalPrice(result);
    await result.save();
    response.status(200).json({
      message: "Remove From Cart Successfully 😃",
      cart: result,
    });
  }
);
//! to delete one copy of product
const removeProductFromCart = catchError(async (request, response, next) => {
  const cart = await cartModel.findOne({ user: request.user._id });
  if (!cart) return next(ErrorMessage(401, "Cart Not Exist"));

  const { product } = request.body;
  const itemIndex = cart.cartItems.findIndex((item) => item.product == product);
  if (itemIndex === -1) return next(ErrorMessage(401, "Item Not Exist"));

  const item = cart.cartItems[itemIndex];
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.cartItems.splice(itemIndex, 1);
  }
  totalPrice(cart);
  if (cart.discount) {
    cart.totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
  }
  await cart.save();
  response.status(200).json({
    message: "Item removed from cart",
    cart,
  });
});

const getUserCart = catchError(async (request, response, next) => {
  const isCartExist = await cartModel
    .findOne({ user: request.user._id })
    .populate("cartItems.product");
  if (!isCartExist) {
    response.status(200).json({
      message: "Your Cart Is Empty",
      cart: isCartExist || [],
    });
    // return next(ErrorMessage(400, "You Not Have Product In Cart"));
  }
  response.status(200).json({
    message: "Success",
    cart: isCartExist,
  });
});

const applyCoupon = catchError(async (request, response, next) => {
  const coupon = await couponModel.findOne({
    code: request.body.code,
    expires: { $gt: Date.now() },
  });
  if (!coupon) return next(ErrorMessage(404, "Coupon  Expire"));
  let cart = await cartModel.findOne({ user: request.user._id });
  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.discount = coupon.discount;
  await cart.save();
  response.status(201).json({
    message: "success",
    cart,
  });
});

export {
  addProductToCart,
  getUserCart,
  removeProductFromCart,
  removeAllCopyProductFromCart,
  applyCoupon,
};
