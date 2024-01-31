import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <div>
        Dashboard
      </div>
      <div>
        Welcome {session?.user.username}!
      </div>
    </div>
  )
};

export default page;