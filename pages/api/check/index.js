import Session from "../../../models/Session";
import dbConnect from "../../../utils/dbConnection";
import User from "../../../models/User";
export default async function handler(req, res) {
  const { method } = req;
  const body = req.body;
  body;
  await dbConnect();
  if (method == "POST") {
    try {
      const user = await User.find({
        email: body.email,
        password: body.password,
      });

      res.status(200).json({ user: user[0] });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
