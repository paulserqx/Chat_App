import { icons } from "collections";
import { Popup } from "components";
import { usePopup, useUser } from "hooks";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi, IRoom } from "services";

interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const router = useRouter();
  const { user } = useUser();
  const { popupOpened, togglePopup } = usePopup();

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  const handleGoToRoom = (roomName: string, userJoined: boolean) => () => {
    if (!userJoined) {
      firebaseApi.POST.room.join(roomName);
      console.log("joining");
    }
    if (router.pathname === "/chats") {
      router.push(`chats/${roomName}`);
    } else {
      router.push(roomName);
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
              const userHasJoined = Object.values(room.members)
                .map((el) => el.user)
                .indexOf(user?.uid || "");
              return (
                <div
                  key={i}
                  className="dashboard-room "
                  onClick={handleGoToRoom(
                    room.name,
                    userHasJoined >= 0 ? true : false
                  )}
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
