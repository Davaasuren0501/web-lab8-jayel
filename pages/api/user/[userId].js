import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const id = req.query.userId;
  req;
  await dbConnect();
  if (method == "GET") {
    try {
      const users = await User.findById(id);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method == "PUT") {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
