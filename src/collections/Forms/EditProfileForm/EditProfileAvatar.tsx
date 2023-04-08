import {
  dragon,
  bat,
  eagle,
  elf,
  fish,
  medusa,
  overlord,
  dracula,
  badger,
  doctor,
  horse,
  tears,
  octopus,
  tiger,
  dino,
} from "assets";
import { Loader, TPopups } from "components";
import { usePopup, useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { IUserInfo, firebaseApi } from "services";

interface EditProfileFormProps {
  closePopup: (type?: TPopups) => () => void;
  ref?: RefObject<HTMLFormElement>;
}

export const avatars: {
  [key: string]: any;
} = {
  dragon: dragon,
  bat: bat,
  eagle: eagle,
  dracula: dracula,
  elf: elf,
  fish: fish,
  medusa: medusa,
  overlord: overlord,
  badger: badger,
  doctor: doctor,
  horse: horse,
  tears: tears,
  octopus: octopus,
  tiger: tiger,
  dino: dino,
};

export const EditProfileAvatar: React.FC<EditProfileFormProps> = ({
  closePopup,
  ...props
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);

  useEffect(() => {
    firebaseApi.GET.user.info(uid, setUserInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeAvatar = (avatar: string) => async () => {
    setAvatarChanged(false);
    await firebaseApi.POST.update.avatar(avatar);
    setAvatarChanged(true);
  };

  const { user } = useUser();
  if (!user) return null;

  const { uid } = user;

  return userInfo[0] ? (
    <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
      <div className="edit-profile-avatar">
        <span className="block text-center pt-[10px] pb-[5px]">
          Choose An Avatar
        </span>
        {avatarChanged && (
          <span className="block text-center text-green-500 text-[13px] pb-[5px]">
            Avatar changed succesfully to {userInfo[0].profileImg}
          </span>
        )}
        <div className="avatars">
          {Object.keys(avatars).map((avatar) => (
            <div
              key={avatar}
              className="avatar"
              onClick={handleChangeAvatar(avatar)}
            >
              <Image
                className="rounded-[5px] overflow-hidden"
                src={avatars[avatar].src}
                alt={`${avatar} img`}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={closePopup("null")}
        type="button"
        className="my-[15px] text-center w-full text-white block "
      >
        Cancel
      </button>
    </form>
  ) : (
    <form className="edit-profile-form justify-center items-center flex py-[25px]">
      <Loader />
    </form>
  );
};
