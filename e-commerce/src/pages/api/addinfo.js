import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    const { nameSurname, Phone, Address, Info, Username } = req.body;
    try {
      const existedUser = await User.findOne({ Username });
      if (!existedUser) {
        return res.status(500).json("Username not found");
      }

      await User.findOneAndUpdate(
        { Username },
        {
          Name: nameSurname,
          Phone: Phone,
          Address: Address,
          OptionalDemand: Info,
        }
      );

      res.status(201).json("Added");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
