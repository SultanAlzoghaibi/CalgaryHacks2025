import dbConnect from "../../lib/mongodb";
import Room from "../../../actions/Room";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const rooms = await Room.find({});

    return NextResponse.json(rooms);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
