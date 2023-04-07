import React, { RefObject, useEffect, useRef, useState } from "react";
import { firebaseApi } from "services";

interface EditProfileFormProps {
  ref?: RefObject<HTMLFormElement>;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  ...props
}) => {
  const [joinRoom, setJoinRoom] = useState<string>("");
  const [successfulRoomCreation, setSuccessfulRoomCreation] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [createRoom, setCreateRoom] = useState<string>("");
  const [icon, setIcon] = useState<string>("SiBurton");
  const [iconsSelectorOpened, setIconsSelectorOpened] =
    useState<boolean>(false);

  const handleChangeIcon = (icon: string) => () => {
    setIcon(icon);
    setIconsSelectorOpened(false);
  };

  const handleCreateRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessfulRoomCreation(false);
    if (createRoom.length < 2) {
      setError("The Room name should be at least 2 characters long");
      return;
    }
    const res = await firebaseApi.POST.room.create(createRoom, icon);
    if (!res) {
      setCreateRoom("");
      setSuccessfulRoomCreation(true);
      setError(null);
    } else {
      setError(res.error.message);
    }
  };

  return (
    <form
      className="form pt-[60px]"
      onSubmit={(e) => handleCreateRoomSubmit(e)}
    >
      <div className="form-demo-info">
        <h1 className="text-[18px] mb-1 md:mb-6">Create your own room!</h1>
      </div>
      <div>
        <div className="create-room-icon-container">
          <label className="form-label" htmlFor="createRoom">
            Room Icon
          </label>
          <div className="create-room-icon">
            {/* <RoomIcon size={35} fill="white" /> */}
            <div
              onClick={() => setIconsSelectorOpened(!iconsSelectorOpened)}
              className="change-room-icon"
            >
              Change Icon
            </div>
          </div>
        </div>
        <div
          className={
            iconsSelectorOpened
              ? "room-icons-container"
              : "room-icons-container h-[0px] transition-all duration-1000 my-0"
          }
        >
          {/* {Object.keys(icons).map((icon) => {
            const Icon = icons[icon];
            return (
              <div
                onClick={handleChangeIcon(icon)}
                className="room-icon-choice"
                key={icon}
              >
                <Icon size={35} />
              </div>
            );
          })} */}
        </div>

        <label className="form-label" htmlFor="createRoom">
          Room Name
        </label>
        <input
          type="text"
          id="createRoom"
          value={createRoom}
          placeholder="Room Name..."
          className={"input"}
          onChange={(e) => setCreateRoom(e.target.value)}
        />
        {error && <span className="form-error">{error}</span>}
        {successfulRoomCreation && (
          <span className="form-error text-green-500">Room Created!</span>
        )}
        <button
          className="w-full p-2 py-[10px] border-2 rounded-[10px] bg-black/90 text-white mt-[10px]"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};
