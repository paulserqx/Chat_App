import { firebaseApi } from "services";

export async function getStaticPaths() {
  const rooms = await firebaseApi.GET.allRoomsOnce();
  const paths = Object.keys(rooms).map((room) => ({
    params: { slug: [room] },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  console.log(slug[0]);
  return {
    props: {
      messages: [],
    },
  };
}

export default function ChatRoom(props: any) {
  //   console.log(props);
}
