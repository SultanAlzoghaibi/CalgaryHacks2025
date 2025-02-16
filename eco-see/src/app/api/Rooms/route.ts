import Room from "../../(models)/room";
import { NextResponse } from "next/server";

// 2️⃣ POST Method: Create a new room
export async function POST(req: Request) {
  console.log("POST ran");
  try {
    // Directly use the request body as the room data
    const roomData = await req.json();
    await Room.create(roomData);

    return NextResponse.json(
      { message: "Room created (placeholder)" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the room." },
      { status: 500 }
    );
  }
}
