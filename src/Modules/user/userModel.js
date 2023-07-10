import mongoose from "mongoose";
import bcrypt from "bcrypt";
const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    phone: String,
  },
  { _id: false }
);
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [1, "too short user name"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "minLength 6 characters"],
    },
    changePasswordAt: Date,
    phone: {
      type: String,
      required: [true, "phone number required"],
    },
    profilePic: String,
    role: {
      type: String,
      enum: ["user", "admin"], //* values in this array
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    addresses: [addressSchema],
  },
  { timestamps: true }
);
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});
//? work when update password only , i make it work with password only
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 8);
  }
});
export const userModel = mongoose.model("user", userSchema);
