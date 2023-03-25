import { useRouter } from "next/router";
import { firebaseApi } from "services";

export default function Dashboard({ ...props }) {
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
      <h1>Dashboard</h1>
      <h1 onClick={handleSignOut}>Sign Out</h1>
    </>
  );
}
