import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";

export default async function handler(req, res) {
  await dbConnect();
  if (req.cookies.Auth?.length > 0) {
    if (req.method === "POST") {
      const { Username, id } = req.body;

      const user = await User.findOne({ Username });
      if (!user) {
        return res.status(500).json("User not exist");
      }
      const cart = user.cart;
      const updatedCart = cart.filter((product) => product.id !== id);

      const updatedUserCart = await User.findOneAndUpdate(
        { Username },
        { cart: updatedCart },
        { new: true }
      );
      res.status(201).json(updatedUserCart);
    }
  } else {
    res.status(401).json("Unauthorized");
  }
}
