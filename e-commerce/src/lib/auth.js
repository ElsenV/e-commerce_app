import { jwtVerify } from "jose";

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
