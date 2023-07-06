import { jwtVerify } from "jose";
import { hash } from "bcryptjs";
export const jwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("Secret Key Is not set");
  }
  return secret;
};

export const verifyToken = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(jwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    throw new Error(error);
  }
};

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};
