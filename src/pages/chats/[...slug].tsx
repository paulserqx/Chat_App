import { Sidebar } from "collections";
import { Button } from "components";
import { useRouter } from "next/router";
import { Dashboard as _Dashboard, Messages } from "sections";
import { firebaseApi } from "services";

export async function getStaticPaths() {
  const rooms = await firebaseApi.GET.allRoomsOnce();
  const paths = Object.keys(rooms).map((room) => ({
    params: { slug: [room] },
  }));

  return {
    paths: paths || [{ params: { slug: ["none"] } }],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  return {
    props: {
      slug: slug[0],
      messages: [],
    },
  };
}

interface ChatRoomProps {
  slug: string;
  messages: any[];
}

export default function ChatRoom(props: ChatRoomProps) {
  const router = useRouter();

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
      <div className="flex h-[100vh]">
        <Sidebar />
        <section className="w-full h-full">
          <nav className="bg-grey flex absolute z-10 justify-between w-full py-[20px] px-[40px]">
            <div></div>
            <Button onClick={handleSignOut} text={"Sign Out"} />
          </nav>
          <Messages {...props} />
        </section>
      </div>
    </>
  );
}
