"use client";

import { useState, useEffect } from "react";

export default function RoomPage() {
  const [rooms, setRooms] = useState<
    { _id: string; name: string; code: string }[]
  >([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data);
  };

  // CREATE
  const createRoom = async () => {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      fetchRooms();
    }
  };

  // DELETE
  const deleteRoom = async (id: string) => {
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    fetchRooms();
  };

  // UPDATE (test PUT endpoint)
  const updateRoom = async (id: string) => {
    console.log(`Updating room with ID: ${id}`);

    // Example: we set the new name to "Updated Name"
    const updatedName = "Updated Name";

    const res = await fetch(`/api/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName }),
    });

    if (!res.ok) {
      console.error("Failed to update room");
      return;
    }

    // On success, re-fetch rooms
    fetchRooms();
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Room Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Enter room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={createRoom}
        >
          Create
        </button>
      </div>

      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room._id}
            className="border p-2 flex justify-between items-center"
          >
            <span>
              {room.name} - {room.code}
            </span>
            <div className="flex space-x-4">
              {/* Update button */}
              <button
                className="text-green-500"
                onClick={() => updateRoom(room._id)}
              >
                Update
              </button>

              {/* Delete button */}
              <button
                className="text-red-500"
                onClick={() => deleteRoom(room._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
