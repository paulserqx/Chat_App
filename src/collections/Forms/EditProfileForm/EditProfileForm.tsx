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
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { IUserInfo, firebaseApi } from "services";

interface EditProfileFormProps {
  ref?: RefObject<HTMLFormElement>;
}

const avatars: {
  [key: string]: string;
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

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  ...props
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);

  useEffect(() => {
    firebaseApi.GET.user.info(uid, setUserInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = useUser();
  if (!user) return null;

  console.log(userInfo);

  const { uid } = user;

  return userInfo[0] ? (
    <form
      className="edit-profile-form"
      // onSubmit={(e) => handleCreateRoomSubmit(e)}
    >
      <div className="edit-profile-avatar">
        <span className="block text-center py-[10px]">Choose An Avatar</span>
        <div className="avatars">
          {Object.keys(avatars).map((avatar) => (
            <div key={avatar} className="avatar">
              <Image
                className="rounded-[5px]"
                src={avatars[avatar]}
                alt={"dragon"}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="my-[15px] text-center w-full text-white block"
      >
        Cancel
      </button>
    </form>
  ) : (
    <form className="edit-profile-form"></form>
  );
};
