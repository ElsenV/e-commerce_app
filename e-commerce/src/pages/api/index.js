export default function handler(req, res) {
  console.log(req.body, req);
  const { method } = req;

  if (method === "POST") {
    console.log(req.body, req.query);
    res.status(200).json({ name: "John Doe" });
  }
  if (method === "GET") {
    console.log("GET SERVER");
    console.log(req.body);
    res.status(200).json({ name: "John Doe" });
  }
}
