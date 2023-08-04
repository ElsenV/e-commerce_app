import { hashPassword } from "@/lib/auth";
import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";

export default async function handler(req, res) {
  await dbConnect();
  const resetToken = req.query.resetToken;
  if (req.method === "GET") {
    try {
      const user = await User.findOne({ resetPasswordToken: resetToken });

      if (!user) {
        return res.status(498).json("Reset token has expired");
      }
      if (
        user.resetPasswordExp <
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      ) {
        await User.updateMany(
          {
            resetPasswordToken: resetToken,
          },
          { $unset: { resetPasswordToken: "", resetPasswordExp: "" } }
        );
        return res.status(498).json("Reset token has expired");
      }

      res.status(200).json("Is not expired");
    } catch (error) {
      res.status(403).json(error);
    }
  }

  if (req.method === "POST") {
    const newPassword = req.body;
    try {
      const user = await User.findOne({ resetPasswordToken: resetToken });

      if (!user) {
        return res.status(498).json("Reset token has expired");
      }

      if (
        user.resetPasswordExp <
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      ) {
        await User.updateMany(
          {
            resetPasswordToken: resetToken,
          },
          { $unset: { resetPasswordToken: "", resetPasswordExp: "" } }
        );
        return res.status(401).json("Reset token has expired");
      }
      const hashedPassword = await hashPassword(newPassword);

      const changedPassword = await User.findOneAndUpdate(
        { resetPasswordToken: resetToken },
        {
          Password: hashedPassword,
        },
        { new: true }
      );

      await User.updateMany(
        {
          resetPasswordToken: resetToken,
        },
        { $unset: { resetPasswordToken: "", resetPasswordExp: "" } }
      );

      if (!changedPassword) {
        return res.status(498).json("Password has not been changed");
      }

      res.status(201).json("Password has been changed");
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
