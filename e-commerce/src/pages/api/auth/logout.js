import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const logout = serialize("Auth", "", {
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      res.setHeader("Set-Cookie", logout);
      res.status(200).json("Logged out");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
