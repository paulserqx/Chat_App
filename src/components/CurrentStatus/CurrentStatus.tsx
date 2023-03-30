import React, { RefObject, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMoon } from "react-icons/io5";
import { MdDoDisturbOn } from "react-icons/md";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { useUser } from "hooks";
import { statuses } from "utils";
import { firebaseApi } from "services";

interface CurrentStatusProps {
  ref?: RefObject<HTMLDivElement>;
}

export const CurrentStatus: React.FC<CurrentStatusProps> = ({ ...props }) => {
  const { changeStatus } = useUser();
  const [status, setStatus] = useState("online");

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
            onClick={changeStatus("online")}
            className="rounded-lg px-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[8px] my-[5px] text-[16px] text-white/75 "
          >
            <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700 mr-[10px]" />
            Online
          </li>
          <li className="border-white/70 border-b-[1px] my-[5px]" />
          <li
            onClick={changeStatus("idle")}
            className="rounded-lg px-[5px] hover:bg-slate-600/70 my-[5px] cursor-pointer flex items-center py-[5px] text-[16px] text-white/75"
          >
            <IoMoon fill="orange" className="mr-[10px]" /> Idle
          </li>
          <li
            onClick={changeStatus("do-not-disturb")}
            className="rounded-lg px-[5px] my-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[5px] text-[16px] text-white/75"
          >
            <MdDoDisturbOn fill="red" className="mr-[10px]" /> Do Not Disturb
          </li>
          <li
            onClick={changeStatus("invisible")}
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
