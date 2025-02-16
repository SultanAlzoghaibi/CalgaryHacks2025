import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

// Ideally, connect to MongoDB in a separate file
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const RoomSchema = new Schema(
  {
    title: { type: String, required: true }, // must have a name
    code: {
      type: String,
      required: true,
    }, // auto-generate a 6-character code
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Prevent re-compiling the model during hot-reloading
const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;
