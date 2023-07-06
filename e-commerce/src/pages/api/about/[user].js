import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";

export default async function handler(req, res) {
  dbConnect();

  const Username = req.query.user;

  if (req.method === "GET") {
    try {
      if (!Username) {
        return res.status(500).json("Please write Username");
      }

      const user = await User.findOne({ Username });

      if (!user) {
        return res.status(500).json("There is not user");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).res(error);
    }
  }

  if (req.method === "PUT") {
    const values = req.body;

    try {
      const user = await User.findOne({ Username });
      if (!user) {
        return res.status(500).json("There is not username");
      }

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        {
          Username: values.username,
          Phone: values.Phone,
          Address: values.Address,
          OptionalDemand: values.Info,
        },
        {
          new: true,
        }
      );

      if (!updatedUser) {
        return res.status(500).json("User data couldn't update");
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
