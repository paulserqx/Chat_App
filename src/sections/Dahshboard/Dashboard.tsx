import React, { RefObject, useState } from "react";
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

  const handleJoinRoom = async () => {
    const res = await firebaseApi.POST.createRoom(createRoom);
    if (!res) {
      setJoinRoom("");
    } else {
      alert(res.error.message);
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
    <section
      className="w-full h-full bg-veryDarkGrey/90 pt-[76px] overflow-hidden flex flex-col items-center justify-center"
      {...props}
    >
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
