import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";
interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({ ...props }) => {
  const [createRoom, setCreateRoom] = useState<string>("");
  const [joinRoom, setJoinRoom] = useState<string>("");
  const [successfulRoomCreation, setSuccessfulRoomCreation] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [rooms, setRooms] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  console.log(rooms);

  const handleJoinRoom = async () => {
    const res = await firebaseApi.POST.createRoom(createRoom);
    if (!res) {
      setJoinRoom("");
    } else {
      alert(res.error.message);
    }
  };

  const handleGoToRoom = (path: string) => () => {
    if (router.pathname === "/chats") {
      router.push(`chats/${path}`);
    } else {
      router.push(path);
    }
  };

  const handleCreateRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessfulRoomCreation(false);
    if (createRoom.length < 2) {
      setError("The Room name should be at least 2 characters long");
      return;
    }
    const res = await firebaseApi.POST.createRoom(createRoom);
    if (!res) {
      setCreateRoom("");
      setSuccessfulRoomCreation(true);
      setError(null);
    } else {
      setError(res.error.message);
    }
  };

  return (
    <section className="dashboard" {...props}>
      <div className="dashboard-info">
        <h1 className="dashboard-greeting">Let&apos;s get started!</h1>
        <h3 className="dashboard-greeting-info">
          Click on a room to join the conversation.
        </h3>
        <div className="dashboard-rooms-container">
          {rooms.map((room, i) => (
            <div
              key={i}
              className="dashboard-room "
              onClick={handleGoToRoom(room)}
            >
              {room.slice(0, 2).toUpperCase()}
              <div className="dashboard-room-tooltip">{room}</div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex flex-col bg-transparent text-white w-[190px]"
        onSubmit={(e) => handleCreateRoomSubmit(e)}
      >
        <label htmlFor="createRoom">Create A Room</label>
        <input
          type="text"
          id="createRoom"
          value={createRoom}
          placeholder="Type a room name here..."
          className={error ? "input-error" : "input"}
          onChange={(e) => setCreateRoom(e.target.value)}
        />
        {error && <span className="error">{error}</span>}
        {successfulRoomCreation && (
          <span className="error text-green-500">Room Created!</span>
        )}
        <button className="submit-button" type="submit">
          Create
        </button>
      </form>
      {/* <br />
      <label htmlFor="joinRoom">Join Room</label>
      <input
        type="text"
        id="joinRoom"
        value={joinRoom}
        onChange={(e) => setJoinRoom(e.target.value)}
      />
      <button type="button" onClick={handleJoinRoom}>
        Join
      </button> */}
    </section>
  );
};
