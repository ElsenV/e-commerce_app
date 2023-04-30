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
    // carts: {
    //   type: [
    //     {
    //       products: {
    //         type: [
    //           {
    //             id: {
    //               type: String,
    //               required: true,
    //             },
    //             img: {
    //               type: String,
    //               required: true,
    //             },
    //             title: {
    //               type: String,
    //               required: true,
    //             },
    //             desc: {
    //               type: String,
    //               required: true,
    //             },
    //             price: {
    //               type: Number,
    //               required: true,
    //             },
    //             quantity: {
    //               type: Number,
    //               required: true,
    //             },
    //           },
    //         ],
    //       },
    //       count: {
    //         type: Number,
    //         required: true,
    //       },
    //       total: {
    //         type: Number,
    //         required: true,
    //       },
    //     },
    //   ],
    // },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
