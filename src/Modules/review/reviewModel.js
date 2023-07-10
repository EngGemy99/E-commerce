import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: [true, "review comment required"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "name email phone profilePic -_id",
  });
});
export const reviewModel = mongoose.model("review", reviewSchema);
