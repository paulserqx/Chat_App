import {
  banner_deer,
  banner_dragon,
  banner_forest,
  banner_forest_animals,
  banner_ocean1,
  banner_ocean2,
  banner_samurai,
  banner_samurai2,
  banner_ai,
  banner_astro,
  banner_bison,
  banner_tech_reality,
} from "assets";
import { Loader, TPopups } from "components";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";

interface EditProfileFormProps {
  closePopup: (type?: TPopups) => () => void;
  ref?: RefObject<HTMLFormElement>;
}

export const banners: {
  [key: string]: any;
} = {
  banner_deer: banner_deer,
  banner_ai: banner_ai,
  banner_dragon: banner_dragon,
  banner_samurai: banner_samurai,
  banner_bison: banner_bison,
  banner_astro: banner_astro,
  banner_tech_reality: banner_tech_reality,
  banner_forest: banner_forest,
  banner_ocean1: banner_ocean1,
  banner_forest_animals: banner_forest_animals,
  banner_ocean2: banner_ocean2,
  banner_samurai2: banner_samurai2,
};

export const EditProfileBanner: React.FC<EditProfileFormProps> = ({
  closePopup,
  ...props
}) => {
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);
  const [bannerChanged, setBannerChanged] = useState<boolean>(false);

  useEffect(() => {
    firebaseApi.GET.user.info(uid, setUserInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeBanner = (banner: string) => async () => {
    setBannerChanged(false);
    await firebaseApi.POST.update.banner(banner);
    setBannerChanged(true);
  };

  const { user } = useUser();
  if (!user) return null;

  const { uid } = user;

  return userInfo[0] ? (
    <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
      <div className="edit-profile-avatar">
        <span className="block text-center pt-[10px] pb-[5px]">
          Choose A Banner
        </span>
        {bannerChanged && (
          <span className="block text-center text-green-500 text-[13px] pb-[5px]">
            Avatar changed succesfully to {userInfo[0].banner}
          </span>
        )}
        <div className="avatars">
          {Object.keys(banners).map((banner) => (
            <div
              key={banner}
              className="banner"
              onClick={handleChangeBanner(banner)}
            >
              <Image
                className="rounded-[5px] overflow-hidden"
                src={banners[banner].src}
                alt={`${banner} img`}
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
