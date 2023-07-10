import mongoose from "mongoose";
import qrcode from "qrcode";

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: [true, "coupon code required"],
      unique: true,
    },
    discount: {
      type: Number,
      min: 0,
      required: [true, "coupon discount required"],
    },
    expires: {
      type: Date,
      required: [true, "coupon date required"],
    },
  },
  { timestamps: true }
);

export const couponModel = mongoose.model("coupon", couponSchema);
