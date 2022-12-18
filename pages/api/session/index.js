import Session from "../../../models/Session";
import dbConnect from "../../../utils/dbConnection";

export default async function handler(req, res) {
  const { method } = req;
  const userId = req.query.userId;
  await dbConnect();
  if (method == "POST") {
    try {
      const session = await Session.create(req.body);
      session;
      res.status(201).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
