import User from "@/models/User.js";
import dbConnect from "@/util/mongo.js";
import { resetPasswordToken } from "@/lib/resetpassword";
import sendMail from "@/lib/nodemail.js";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { Email } = req.body;

      const user = await User.findOne({ Email });

      if (!user) {
        return res.status(404).json("Invalid email");
      }
      const reset_Password_Token = await resetPasswordToken();
      const reset_Password_Expire = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000 + 2 * 60 * 1000
      );

      const set_Reset_Token = await User.findOneAndUpdate(
        { Email },
        {
          resetPasswordToken: reset_Password_Token,
          resetPasswordExp: reset_Password_Expire,
        },
        { new: true }
      );
      if (!set_Reset_Token) {
        return res.status(401).json("Reset token couldn't create");
      }

      const resetPasswordLink = `${process.env.NEXT_PUBLIC_BACK_URL}/auth/reset-password/${reset_Password_Token}`;
      const sendedMail = await sendMail(Email, resetPasswordLink);

      res.status(201).json("Reset Token sended Email");
    } catch (error) {
      res.status(404).json(error);
    }
  }
}
