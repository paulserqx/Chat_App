import { avatars, banners } from "collections/Forms";
import { CurrentStatus, Loader, Popup } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import Image from "next/image";
import React, { RefObject } from "react";
import { togglePopup } from "services";
import { statuses } from "utils";

interface CurrentUserDropdownProps {
  opened: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const CurrentUserDropdown: React.FC<CurrentUserDropdownProps> = ({
  ref,
  opened,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { popupOpened, userInfo } = useAppSelector((state) => state.counter);
  return userInfo ? (
    <>
      <Popup
        closePopup={() => dispatch(togglePopup("null"))}
        popupType={popupOpened || "null"}
      />
      <div
        className={
          opened
            ? "dropdown-menu dropdown-menu-opened"
            : "dropdown-menu-closed dropdown-menu" + " z-40"
        }
      >
        <div
          className="profile-banner"
          onClick={() => dispatch(togglePopup("editBanner"))}
        >
          <Image
            src={banners[userInfo.banner] || userInfo.banner}
            fill
            sizes="290px"
            style={{
              objectFit: "cover",
            }}
            className="rounded-t-lg"
            alt={`${userInfo.uid}'s Image`}
          />
          <span className="banner-text hidden w-full h-full bg-black/50  text-white rounded-t-lg">
            CHANGE BANNER
          </span>
        </div>
        <div className="status-dropdown rounded-full w-fit left-[15px] absolute top-[45px] z-20 border-[6px] border-[#232428]">
          <Image
            src={avatars[userInfo.profileImg] || userInfo.profileImg}
            width={80}
            height={80}
            className="rounded-full"
            alt={`${userInfo.uid}'s Image`}
          />
          <div className="absolute bottom-[-2px] right-[-2px] z-20 p-[4px] rounded-full bg-[#232428]">
            {statuses[userInfo.status].icon}
          </div>
          <div
            className="status-bg"
            onClick={() => dispatch(togglePopup("editProfile"))}
          >
            CHANGE AVATAR
          </div>
        </div>
        <div className="pt-[60px] pb-[20px] px-[10px] shadow-button rounded-b-lg bg-[#232428]">
          <div className="flex flex-col p-[10px] rounded-xl bg-veryDarkGrey/80">
            <div className="border-b-[1px] border-slate-400 text-white pb-[10px] text-[18px]">
              {userInfo.name} #{userInfo.uid.slice(0, 4)}
            </div>
            <div className="text-white py-[10px] text-[15px] border-b-[1px] border-slate-400">
              <div className="pb-[5px]">Discord Member since</div>
              <div className="opacity-[0.7]">
                {userInfo.memberSince.slice(0, -13)}
              </div>
            </div>
            <CurrentStatus status={userInfo.status} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div
      className={
        opened
          ? "dropdown-menu dropdown-menu-opened"
          : "dropdown-menu-closed dropdown-menu" + " z-40"
      }
    >
      <Loader />
    </div>
  );
};
