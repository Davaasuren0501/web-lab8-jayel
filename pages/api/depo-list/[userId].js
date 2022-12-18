import List from "../../../models/List";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const Id = req.query.userId;
  await dbConnect();
  if (method == "GET") {
    try {
      const users = await List.find({ _user: Id, type: "DEPOSIT" });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "DELETE") {
    try {
      const lists = await List.findByIdAndDelete({ _id: Id });
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "PUT") {
    try {
      const user = await List.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
