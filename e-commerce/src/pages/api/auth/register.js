import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    const { Username, Email, Password } = req.body.values;
    try {
      const existUser = await User.findOne({ Email });
      if (existUser) {
        return res.status(409).json("Email has already");
      }
      const secret = process.env.JWT_SECRET;

      const hashedPassword = await hash(Password, 10);
      const token = sign({ username: Username }, secret, { expiresIn: 60 });

      const serialized = serialize("Auth", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60,
        path: "/",
      });

      const user = await User.create({
        Username,
        Email,
        Password: hashedPassword,
      });
      res.setHeader("Set-Cookie", serialized);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
