import List from "../../../models/List";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;
  await dbConnect();

  if (method == "POST") {
    try {
      const user = await List.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
