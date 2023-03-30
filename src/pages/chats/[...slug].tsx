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
  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar />
        <section className="w-full h-full">
          <Messages {...props} />
        </section>
      </div>
    </>
  );
}
