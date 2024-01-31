import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className='text-4xl'>Home</h1>
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </>
  );
}
