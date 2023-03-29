import React, { RefObject, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMoon } from "react-icons/io5";
import { MdDoDisturbOn } from "react-icons/md";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { firebaseApi } from "services";

interface CurrentStatusProps {
  ref?: RefObject<HTMLDivElement>;
}

const statuses: { [key: string]: { text: string; icon: any } } = {
  online: {
    text: "Online",
    icon: (
      <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700 mr-[10px]" />
    ),
  },
  idle: { text: "Idle", icon: <IoMoon fill="orange" className="mr-[10px]" /> },
  "do-not-disturb": {
    text: "Do Not Disturb",
    icon: <MdDoDisturbOn fill="red" className="mr-[10px]" />,
  },
  invisible: {
    text: "Invisible",
    icon: (
      <BsFillRecordCircleFill fill="grey" size={13} className="mr-[10px]" />
    ),
  },
};

export const CurrentStatus: React.FC<CurrentStatusProps> = ({ ...props }) => {
  const [status, setStatus] = useState<string>("online");

  const handleChangeStatus = (status: string) => async () => {
    const res = await firebaseApi.POST.changeStatus(status);
  };

  useEffect(() => {
    firebaseApi.GET.user(setStatus);
  }, []);

  return (
    <div className="statusButton flex justify-between items-center text-white  text-[15px] pl-[10px] hover:bg-slate-600/70 my-[5px] rounded-lg cursor-pointer">
      <div className="flex">
        {statuses[status].icon}
        {statuses[status].text}
      </div>
      <RiArrowDropDownLine fontSize={30} className=" -rotate-90" />

      {/* on hover status menu */}
      <div className="statusMenu cursor-default absolute hidden right-[-85%] ">
        <div className="opacity-0 bg-transparent">here</div>
        <ul className="px-[15px] py-[5px] rounded-lg bg-veryDarkGrey">
          <li
            onClick={handleChangeStatus("online")}
            className="rounded-lg px-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[8px] my-[5px] text-[16px] text-white/75 "
          >
            <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700 mr-[10px]" />
            Online
          </li>
          <li className="border-white/70 border-b-[1px] my-[5px]" />
          <li
            onClick={handleChangeStatus("idle")}
            className="rounded-lg px-[5px] hover:bg-slate-600/70 my-[5px] cursor-pointer flex items-center py-[5px] text-[16px] text-white/75"
          >
            <IoMoon fill="orange" className="mr-[10px]" /> Idle
          </li>
          <li
            onClick={handleChangeStatus("do-not-disturb")}
            className="rounded-lg px-[5px] my-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[5px] text-[16px] text-white/75"
          >
            <MdDoDisturbOn fill="red" className="mr-[10px]" /> Do Not Disturb
          </li>
          <li
            onClick={handleChangeStatus("invisible")}
            className="rounded-lg px-[5px] my-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[5px] text-[16px] text-white/75"
          >
            <BsFillRecordCircleFill
              fill="grey"
              size={13}
              className="mr-[10px]"
            />{" "}
            Invisible
          </li>
        </ul>
      </div>
    </div>
  );
};
