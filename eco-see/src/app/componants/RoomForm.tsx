"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RoomForm = () => {
  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setRoomData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const startingRoomData = {
    title: "",
    code: "",
  };

  const [roomData, setRoomData] = useState(startingRoomData);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black p-6">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        {/* Heading remains white */}
        <h3 className="text-white text-xl font-semibold mb-4">
          Create a new room
        </h3>

        {/* Label and input text are black */}
        <label className="block text-black text-sm font-medium mb-2">
          Title
        </label>
        <input
          name="title"
          type="text"
          onChange={handleChange}
          required
          value={roomData.title}
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
