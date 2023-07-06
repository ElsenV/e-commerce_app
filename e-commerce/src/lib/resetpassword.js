import crypto from "crypto";

export const resetPasswordToken = async () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return passwordToken;
};
