import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is Required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);
categorySchema.post("init", (doc) => {
  if (doc.image) {
    doc.image = `${process.env.BASE_URL}/category/${doc.image}`;
  }
});
export const categoryModel = mongoose.model("category", categorySchema);
