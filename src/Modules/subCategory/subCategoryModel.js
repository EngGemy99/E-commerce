import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is Required"],
      trim: true,
      required: true,
      minLength: [2, "too short subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);
export const subCategoryModel = mongoose.model(
  "subCategory",
  subcategorySchema
);
