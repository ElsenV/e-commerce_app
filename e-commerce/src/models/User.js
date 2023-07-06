import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      default: null,
    },
    Phone: {
      type: Number,
      default: null,
    },
    Address: {
      type: String,
      default: null,
    },
    OptionalDemand: {
      type: String,
      default: null,
    },
    cart: [
      {
        id: Number,
        quantity: Number,
      },
    ],
    resetPasswordToken:String,
    resetPasswordExp:Date
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
