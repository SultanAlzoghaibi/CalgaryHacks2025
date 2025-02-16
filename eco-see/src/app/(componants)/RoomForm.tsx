"use client";

import React, { useEffect, useState } from "react";

type Room = {
  _id: string;
  name: string;
  code: string;
};

const RoomCard = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rooms");

        if (!res.ok) {
          throw new Error(`Failed to fetch room data. Status: ${res.status}`);
        }

        const responseData = await res.json();
        console.log("Fetched Rooms:", responseData); // Debugging

        // Validate API response structure
        if (
          !responseData ||
          !Array.isArray(responseData.data) ||
          responseData.data.length === 0
        ) {
          throw new Error("No rooms found in the database.");
        }

        setRoom(responseData.data[0]); // Set the first room
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError((err as Error).message); // Store error for display
      }
    };

    fetchRoom();
  }, []);

  // Show error if fetch failed
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Show loading state
  if (!room) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-[40rem] mx-auto px-6">
      <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 p-6">
        {/* Room Details */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{room.name}</h2>
        <p className="text-lg text-gray-600">
          Room Code: <span className="font-semibold">{room.code}</span>
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
