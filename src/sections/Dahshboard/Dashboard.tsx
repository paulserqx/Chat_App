import { icons } from "collections";
import { Popup } from "components";
import { usePopup } from "hooks";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi, IRoom } from "services";

interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const router = useRouter();
  const { popupOpened, togglePopup } = usePopup();

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  // const handleJoinRoom = async () => {
  //   const res = await firebaseApi.POST.createRoom(createRoom);
  //   if (!res) {
  //     setJoinRoom("");
  //   } else {
  //     alert(res.error.message);
  //   }
  // };

  const handleGoToRoom = (path: string) => () => {
    if (router.pathname === "/chats") {
      router.push(`chats/${path}`);
    } else {
      router.push(path);
    }
  };

  return (
    <>
      {popupOpened && (
        <div className="fixed z-50 left-0 w-full">
          <Popup closePopup={togglePopup} popupType={popupOpened || "null"} />
        </div>
      )}
      <section className="dashboard" {...props}>
        <div className="dashboard-info">
          <h1 className="dashboard-greeting">Let&apos;s get started!</h1>
          <h3 className="dashboard-greeting-info">
            Click on a room to join the conversation.
          </h3>
          <div className="dashboard-rooms-container">
            {rooms.map((room, i) => {
              const Icon = icons[room.icon];
              return (
                <div
                  key={i}
                  className="dashboard-room "
                  onClick={handleGoToRoom(room.name)}
                >
                  <Icon size={20} />
                  <div className="dashboard-room-tooltip">{room.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dashboard-or-marker" />

        <button
          onClick={togglePopup("createRoom")}
          className="create-room-button"
          type="button"
        >
          Create A New Room
        </button>
      </section>
    </>
  );
};
