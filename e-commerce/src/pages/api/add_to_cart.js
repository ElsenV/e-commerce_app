import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";

export default async function handler(req, res) {
  dbConnect();

  if (req.cookies.Auth?.length > 0) {
    if (req.method === "POST") {
      const { data, username, quantity } = req.body;
      const user = await User.findOne({ Username: username });

      if (!user) {
        return res.status(500).json("User not exist");
      }

      const sameProduct = user.cart?.some(
        (cartProduct) => data.id === cartProduct.id
      );

      let updatedUser = user.cart;

      if (!sameProduct) {
        const addedCart = [...user.cart, { id: data.id, quantity }];
        updatedUser = await User.findOneAndUpdate(
          { Username: username },
          {
            cart: addedCart,
          },
          { new: true }
        );
      } else {
        const addedCart = await user.cart.map((cartProduct) =>
          cartProduct.id === data.id
            ? (cartProduct.quantity = +quantity)
            : cartProduct
        );

        updatedUser = await User.findOneAndUpdate(
          { Username: username },
          {
            cart: addedCart,
          },
          { new: true }
        );
      }
      res.status(201).json(updatedUser);
    }
  } else {
    res.status(401).json("Unauthorized");
  }
}
