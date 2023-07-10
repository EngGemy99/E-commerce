import categoryRoute from "./category/categoryRoute.js";
import subCategoryRoute from "./subCategory/sunCategoryRoute.js";
import brandRoute from "./brand/brandRoute.js";
import productRoute from "./product/productRoute.js";
import userRoute from "./user/userRoute.js";
import wishListRoute from "./wishList/wishListRoute.js";
import addressRoute from "./address/addressRoute.js";
import authRoute from "./auth/authRoute.js";
import reviewRoute from "./review/reviewRoute.js";
import couponRoute from "./coupon/couponRoute.js";
import cartRoute from "./cart/cartRoute.js";
import orderRoute from "./order/orderRoute.js";
import { ErrorMessage } from "../utils/ErrorMessage.js";

export function allRoutes(app) {
  app.use(authRoute);
  app.use("/user", userRoute);
  app.use("/wishList", wishListRoute);
  app.use("/address", addressRoute);
  app.use("/product", productRoute);
  app.use("/brand", brandRoute);
  app.use("/category", categoryRoute);
  app.use("/subCategory", subCategoryRoute);
  app.use("/review", reviewRoute);
  app.use("/coupon", couponRoute);
  app.use("/cart", cartRoute);
  app.use("/orders", orderRoute);

  //! Not Found Page
  app.use((request, response, next) => {
    next(ErrorMessage(404, `Not found - ${request.originalUrl}`));
  });

  //! to catch any error
  app.use((error, request, response, next) => {
    console.log(error);
    response.status(error.status || 500).json({
      error: error.message,
      statusError: error.status,
    });
  });
}
