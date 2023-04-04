import React, { RefObject, useEffect, useRef, useState } from "react";
import { firebaseApi } from "services";
import {
  GiTreeBeehive,
  GiBasketballBasket,
  GiConsoleController,
} from "react-icons/gi";
import { TbTrees, TbBrandJavascript, TbLanguage } from "react-icons/tb";
import {
  FaHamburger,
  FaSwimmer,
  FaPhp,
  FaReact,
  FaAngular,
  FaDiscord,
} from "react-icons/fa";
import { SiBurton } from "react-icons/si";
import { MdSportsRugby } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { SiRubyonrails } from "react-icons/si";
import { IoIosFitness } from "react-icons/io";

const icons = {
  GiTreeBeehive,
  GiBasketballBasket,
  GiConsoleController,
  TbTrees,
  TbBrandJavascript,
  TbLanguage,
  FaHamburger,
  FaSwimmer,
  FaPhp,
  FaReact,
  SiBurton,
  FaAngular,
  FaDiscord,
  MdSportsRugby,
  BsRobot,
  HiChatBubbleLeftRight,
  SiRubyonrails,
  IoIosFitness,
};

interface CreateRoomFormProps {
  ref?: RefObject<HTMLFormElement>;
}

export const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ ...props }) => {
  const [joinRoom, setJoinRoom] = useState<string>("");
  const [successfulRoomCreation, setSuccessfulRoomCreation] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [createRoom, setCreateRoom] = useState<string>("");
  const [roomIcon, setRoomIcon] = useState("");

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
    <form
      className="form pt-[60px]"
      onSubmit={(e) => handleCreateRoomSubmit(e)}
    >
      <div className="form-demo-info">
        <FaDiscord size={50} className="hidden md:block md:mb-[20px]" />
        <h1 className="text-[18px] mb-1 md:mb-6">Create your own room!</h1>
        {/* <span className="md:mb-1">email: user@gmail.com</span>
        <span>password: 123123</span> */}
      </div>
      <div>
        <div className="create-room-icon-container">
          <label className="form-label" htmlFor="createRoom">
            Room Icon
          </label>
          <div className="create-room-icon">
            <div className="change-room-icon">Change Icon</div>
            <HiChatBubbleLeftRight size={35} fill={"white"} />
          </div>
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
