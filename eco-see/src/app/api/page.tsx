"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [rooms, setRooms] = useState<{ _id: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setRooms(data.data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return; // Prevent empty submissions

    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }), // Only sending `name`
      });

      if (!res.ok) throw new Error("Failed to create room");

      fetchRooms();
      setRoomName(""); // Clear input after submission
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Rooms</h1>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="name"
          placeholder="Room title"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Add Room
        </button>
      </form>

      {/* Room List */}
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room._id} className="p-2 border rounded">
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
