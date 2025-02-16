import dbConnect from "../lib/mongodb";
import Item from "../../actions/Room";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
