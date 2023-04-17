import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiHash } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { firebaseApi } from "services";
import dynamic from "next/dynamic";
import { useUser } from "contexts";

const Sidebar = dynamic(() => import("collections").then((el) => el.Sidebar));
const RoomMembers = dynamic(() =>
  import("collections").then((el) => el.RoomMembers)
);
const Button = dynamic(() => import("components").then((el) => el.Button));
const _Dashboard = dynamic(() => import("sections").then((el) => el.Dashboard));
const Messages = dynamic(() => import("sections").then((el) => el.Messages));

export default function ChatRoom() {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
  const [roomMembersOpened, setRoomMembersOpened] = useState<boolean>(false);

  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "";

  const { setUserInfo } = useUser();

  const handleSignOut = async () => {
    try {
      const response = await firebaseApi.POST.signOut();
      setUserInfo([]);
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.push("/");
      document.body.style.overflow = "auto";
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
    setRoomMembersOpened(false);
  };

  const handleMembersSidebar = () => {
    setRoomMembersOpened(!roomMembersOpened);
    setSidebarOpened(false);
  };

  useEffect(() => {
    const widthWatcher = () => {
      const bodyWidth = window.innerWidth;
      if (bodyWidth > 768) {
        setSidebarOpened(true);
        setRoomMembersOpened(true);
      } else {
        setSidebarOpened(false);
        setRoomMembersOpened(false);
      }
    };
    window.onresize = widthWatcher;
    widthWatcher();
  }, []);

  // this is going to update the last seen timestamp
  // of the room on refresh
  // useEffect(() => {
  //   if (slug === "") return;
  //   firebaseApi.POST.message.lastSeen(slug);
  // }, [slug]);

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <section className="flex flex-col w-full h-full md:pl-[75px] md:pr-[200px]">
          <nav className="navigation md:pr-[200px]">
            <div
              className="md:hidden cursor-pointer"
              onClick={handleToggleSidebar}
            >
              {sidebarOpened ? (
                <RxCross1 size={30} fill="white" color="white" />
              ) : (
                <IoMenuSharp size={30} fill="white" />
              )}
            </div>
            <div className="flex items-center text-white text-[18px]">
              <BiHash size={20} className="bottom-[-1.5px] pr-[2px]" />
              {slug}
            </div>
            <button
              onClick={handleSignOut}
              className="hidden md:block mr-[100px]"
            >
              <Button text={"Sign Out"} />
            </button>
            <button onClick={handleMembersSidebar} className="md:hidden">
              <BsFillPeopleFill size={25} fill="white" />
            </button>
          </nav>
          <Messages />
        </section>
        <RoomMembers
          setRoomMembers={setRoomMembersOpened}
          membersSideOpened={roomMembersOpened}
          slug={slug}
        />
      </div>
    </>
  );
}
