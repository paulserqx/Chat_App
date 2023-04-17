import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebaseApi } from "services";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { BiHash } from "react-icons/bi";

import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("collections").then((el) => el.Sidebar));
const Button = dynamic(() => import("components").then((el) => el.Button));
const _Dashboard = dynamic(() => import("sections").then((el) => el.Dashboard));

export default function Dashboard({ ...props }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await firebaseApi.POST.signOut();
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.push("/");
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const widthWatcher = () => {
      const bodyWidth = window.innerWidth;
      if (bodyWidth > 768) {
        setSidebarOpened(true);
      } else {
        setSidebarOpened(false);
      }
    };
    window.onresize = widthWatcher;
    widthWatcher();
  }, []);

  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <section className="w-full h-full md:pl-[75px]">
          <nav className="navigation">
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setSidebarOpened(!sidebarOpened)}
            >
              {sidebarOpened ? (
                <RxCross1 size={30} fill="white" color="white" />
              ) : (
                <IoMenuSharp size={30} fill="white" />
              )}
            </div>
            <h1 className="hidden md:flex text-white text-[20px]">
              <BiHash size={25} fill="white" className="top-[-1px] pr-[2px]" />
              Explore
            </h1>
            <button onClick={handleSignOut}>
              <Button text={"Sign Out"} />
            </button>
          </nav>
          <_Dashboard />
        </section>
      </div>
    </>
  );
}
