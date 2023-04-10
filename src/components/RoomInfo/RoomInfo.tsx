import { Emoji, EmojiStyle } from "emoji-picker-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { FaRedditAlien, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiSearchEyeLine, RiUserAddLine } from "react-icons/ri";
import { VscReactions } from "react-icons/vsc";
import { FiChevronRight } from "react-icons/fi";

interface RoomInfoProps {
  room: string;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomInfo: React.FC<RoomInfoProps> = ({ room, ...props }) => {
  return (
    <div className="room-info-container">
      <h1 className="room-info-heading">Welcome to {room}</h1>
      <p className="room-info-paragraph">
        This is a brand-new, shiny server. Here are some tips to get you started
        and show you whats possible.
      </p>
      <div className="room-info-block">
        <RiUserAddLine size={30} className="mr-[20px]" /> Tell your friends to
        join the server.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block">
        <RiSearchEyeLine size={35} className="mr-[20px]" />
        Inspect the chat room members.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block">
        <VscReactions size={35} className="mr-[20px]" />
        React with Emojis to their messages.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block">
        <MdEdit size={30} className="mr-[20px]" />
        Edit your messages as you wish.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block">
        <FaTrashAlt size={30} className="mr-[20px]" />
        Delete your messages if needed.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
    </div>
  );
};
