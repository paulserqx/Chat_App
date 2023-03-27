import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";
interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({ ...props }) => {
  const [createRoom, setCreateRoom] = useState<string>("");
  const [joinRoom, setJoinRoom] = useState<string>("");

  const handleJoinRoom = async () => {
    const res = await firebaseApi.POST.createRoom(createRoom);
    if (!res) {
      setJoinRoom("");
    } else {
      alert(res.error.message);
    }
  };

  const handleCreateRoom = async () => {
    const res = await firebaseApi.POST.createRoom(createRoom);
    if (!res) {
      setCreateRoom("");
    } else {
      alert(res.error.message);
    }
  };

  useEffect(() => {
    firebaseApi.GET.allRooms();
  }, []);

  return (
    <section
      className="w-full h-full bg-slate-400 pt-[76px] overflow-hidden"
      {...props}
    >
      <label htmlFor="createRoom">Create A Room</label>
      <input
        type="text"
        id="createRoom"
        value={createRoom}
        onChange={(e) => setCreateRoom(e.target.value)}
      />
      <button type="button" onClick={handleCreateRoom}>
        Join
      </button>
      <br />
      <label htmlFor="joinRoom">Join Room</label>
      <input
        type="text"
        id="joinRoom"
        value={joinRoom}
        onChange={(e) => setJoinRoom(e.target.value)}
      />
      <button type="button" onClick={handleJoinRoom}>
        Join
      </button>
    </section>
  );
};
