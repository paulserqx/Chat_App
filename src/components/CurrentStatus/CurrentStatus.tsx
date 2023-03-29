import React, { RefObject } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMoon } from "react-icons/io5";
import { MdDoDisturbOn } from "react-icons/md";
import { BsFillRecordCircleFill } from "react-icons/bs";

interface CurrentStatusProps {
  ref?: RefObject<HTMLDivElement>;
}

export const CurrentStatus: React.FC<CurrentStatusProps> = ({ ...props }) => {
  return (
    <div className="statusButton flex justify-between items-center text-white  text-[15px] pl-[10px] hover:bg-slate-600/70 my-[5px] rounded-lg cursor-pointer">
      <div className="flex">
        <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700 mr-[10px]" />
        Online
      </div>
      <RiArrowDropDownLine fontSize={30} className=" -rotate-90" />

      {/* on hover status menu */}
      <div className="statusMenu cursor-default absolute hidden right-[-85%] ">
        <div className="opacity-0 bg-transparent">here</div>
        <ul className="px-[15px] py-[5px] rounded-lg bg-veryDarkGrey">
          <li className="rounded-lg px-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[8px] my-[5px] text-[16px] text-white/75 ">
            <div className="rounded-full w-[13px] h-[13px] left-0 bg-green-700 mr-[10px]" />
            Online
          </li>
          <li className="border-white/70 border-b-[1px] my-[5px]" />
          <li className="rounded-lg px-[5px] hover:bg-slate-600/70 my-[5px] cursor-pointer flex items-center py-[5px] text-[16px] text-white/75">
            <IoMoon fill="orange" className="mr-[10px]" /> Idle
          </li>
          <li className="rounded-lg px-[5px] my-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[5px] text-[16px] text-white/75">
            <MdDoDisturbOn fill="red" className="mr-[10px]" /> Do Not Disturb
          </li>
          <li className="rounded-lg px-[5px] my-[5px] hover:bg-slate-600/70 cursor-pointer flex items-center py-[5px] text-[16px] text-white/75">
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
