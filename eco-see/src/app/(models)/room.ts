// models/Room.ts
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const RoomSchema = new Schema(
  {
    name: { type: String, required: true }, // must have a name
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Ensure Mongoose returns JSON-friendly data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;
