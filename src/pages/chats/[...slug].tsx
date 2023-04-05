import { Sidebar } from "collections";
import { Button } from "components";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiHash } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMenuSharp } from "react-icons/io5";
import { Dashboard as _Dashboard, Messages } from "sections";
import { firebaseApi } from "services";

export default function ChatRoom() {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "";

  const handleSignOut = async () => {
    try {
      const response = await firebaseApi.POST.signOut();
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar sidebarOpened={sidebarOpened} />
        <section className="flex flex-col w-full h-full">
          <nav className="navigation">
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setSidebarOpened(!sidebarOpened)}
            >
              <IoMenuSharp size={30} fill="white" />
            </div>
            <div className="pl-[20px ] flex items-center text-white">
              <BiHash size={20} className="bottom-[-1.5px]" />
              {slug}
            </div>
            <button onClick={handleSignOut}>
              <BsFillPeopleFill size={25} fill="white" />
            </button>
          </nav>
          <Messages />
        </section>
      </div>
    </>
  );
}
