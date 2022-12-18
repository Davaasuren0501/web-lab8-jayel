import List from "../../../models/List";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const Id = req.query.userId;
  await dbConnect();
  if (method == "GET") {
    try {
      const lists = await List.find();
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
