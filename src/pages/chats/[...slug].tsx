import { RoomMembers, Sidebar } from "collections";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiHash } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMenuSharp } from "react-icons/io5";
import { Dashboard as _Dashboard, Messages } from "sections";
import { RxCross1 } from "react-icons/rx";

export default function ChatRoom() {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
  const [roomMembersOpened, setRoomMembersOpened] = useState<boolean>(false);

  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "";

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
      }
    };
    window.onresize = widthWatcher;
    widthWatcher();
  }, []);

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <section className="flex flex-col w-full h-full">
          <nav className="navigation">
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
            <button onClick={handleMembersSidebar}>
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
