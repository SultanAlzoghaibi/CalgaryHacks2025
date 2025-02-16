"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RoomForm = () => {
  const router = useRouter();

  // Use 'name' instead of 'title' if your backend expects a 'name'
  const startingRoomData = {
    name: "",
    code: "",
  };
  const [roomData, setRoomData] = useState(startingRoomData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/Rooms", {
      method: "POST",
      body: JSON.stringify(roomData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to create room");
    }

    router.refresh();
    router.push("/rooms");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-6">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h3 className="text-white text-xl font-semibold mb-4">
          Create a new room
        </h3>
        <label className="block text-black text-sm font-medium mb-2">
          Name
        </label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          required
          value={roomData.name}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
        />
        <button
          type="submit"
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
