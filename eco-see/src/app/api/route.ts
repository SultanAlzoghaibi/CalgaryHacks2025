/* eslint-disable @typescript-eslint/no-unused-vars */
import Room from "../(models)/room";
import { NextResponse } from "next/server";

// 2️⃣ POST Method: Create a new room
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const roomData = body.formData;
    await Room.create(roomData);

    return NextResponse.json(
      { message: "Room created (placeholder)" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the room." },
      { status: 500 }
    );
  }
}
