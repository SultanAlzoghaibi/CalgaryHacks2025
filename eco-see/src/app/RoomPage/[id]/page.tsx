import RoomForm from "@/app/(componants)/RoomForm";
import React from "react";

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Room Page {params.id}</h1>
      <RoomForm />
    </div>
  );
};

export default RoomPage;
