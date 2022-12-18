import Session from "../../../models/Session";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const Id = req.query.userId;
  await dbConnect();
  if (method == "GET") {
    try {
      const session = await Session.find({ _user: Id });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const session = await Session.findOneAndDelete({ token: Id });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
