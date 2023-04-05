import { Sidebar } from "collections";
import { Button } from "components";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dashboard as _Dashboard } from "sections";
import { firebaseApi } from "services";
import { IoMenuSharp } from "react-icons/io5";

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

  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar sidebarOpened={sidebarOpened} />
        <section className="w-full h-full">
          <nav className="navigation">
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setSidebarOpened(!sidebarOpened)}
            >
              <IoMenuSharp size={30} fill="white" />
            </div>
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
