import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const serialized = serialize("Auth", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.status(200).json("Logged out");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
