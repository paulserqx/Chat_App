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
  scrollToLastMessage: () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomInfo: React.FC<RoomInfoProps> = ({
  scrollToLastMessage,
  room,
  ...props
}) => {
  return (
    <div className="room-info-container">
      <h1 className="room-info-heading">Welcome to {room}</h1>
      <p className="room-info-paragraph">
        This is a brand-new, shiny server. Here are some tips to get you started
        and show you whats possible.
      </p>
      <div className="room-info-block" onClick={scrollToLastMessage}>
        <RiUserAddLine size={30} className="mr-[20px]" /> Tell your friends to
        join the server.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block" onClick={scrollToLastMessage}>
        <RiSearchEyeLine size={35} className="mr-[20px]" />
        Inspect the chat room members.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block" onClick={scrollToLastMessage}>
        <VscReactions size={35} className="mr-[20px]" />
        React with Emojis to their messages.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block" onClick={scrollToLastMessage}>
        <MdEdit size={30} className="mr-[20px]" />
        Edit your messages if you made a mistake.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
      <div className="room-info-block" onClick={scrollToLastMessage}>
        <FaTrashAlt size={30} className="mr-[20px]" />
        Delete your messages if needed.
        <FiChevronRight size={25} className="absolute right-[10px]" />
      </div>
    </div>
  );
};
