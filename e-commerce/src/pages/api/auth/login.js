import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { Email, Password } = req.body;

    try {
      const existedUser = await User.findOne({ Email });

      if (!existedUser) {
        return res.status(201).json("There is not User");
      }
      const compared = await bcryptjs.compare(Password, existedUser.Password);

      if (!compared) {
        return res.status(401).json("Invalid Email or Password");
      }
      const secret = process.env.JWT_SECRET;

      const token = sign({ username: existedUser.Username }, secret, {
        expiresIn: 260,
      });

      const serialized = serialize("Auth", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 230,
        path: "/",
      });

      await res.setHeader("Set-Cookie", serialized);
      res.status(201).json(existedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
