import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { hashPassword } from "@/lib/auth";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { Username, Email, Password } = req.body.values;

    try {
      const existUser = await User.findOne({ Email });
      if (existUser) {
        return res.status(409).json("Email has already");
      }
      const secret = process.env.JWT_SECRET;

      const hashedPassword = await hashPassword(Password);
      const token = sign({ username: Username }, secret, { expiresIn: 300 });

      const serialized = serialize("Auth", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 300,
        path: "/",
      });

      const user = await User.create({
        Username,
        Email,
        Password: hashedPassword,
        cart: [],
      });
      res.setHeader("Set-Cookie", serialized);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
