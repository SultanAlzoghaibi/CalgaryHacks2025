/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Room } from "../../../(models)/room";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { name } = await request.json();

    // Find by ID and update the 'name'
    const updatedRoom = await Room.findByIdAndUpdate(
      params.id,
      { name },
      { new: true }
    );
    if (!updatedRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await Room.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Room deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
