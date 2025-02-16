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
    <div className="flex flex-col justify-center items-center">
      <form>
        <h3>Create a new room</h3>
        <label>Tittle</label>
        <input
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={roomData.title}
        />
      </form>
    </div>
  );
};

export default RoomForm;
