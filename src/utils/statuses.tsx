import { BsFillRecordCircleFill } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { MdDoDisturbOn } from "react-icons/md";

export const statuses: { [key: string]: { text: string; icon: any } } = {
  online: {
    text: "Online",
    icon: (
      <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700" />
    ),
  },
  idle: {
    text: "Idle",
    icon: <IoMoon fill="orange" className="rounded-full w-[13px] h-[13px]" />,
  },
  "do-not-disturb": {
    text: "Do Not Disturb",
    icon: (
      <MdDoDisturbOn fill="red" className="rounded-full w-[13px] h-[13px]" />
    ),
  },
  invisible: {
    text: "Invisible",
    icon: (
      <BsFillRecordCircleFill
        fill="grey"
        className="rounded-full w-[13px] h-[13px]"
      />
    ),
  },
};
