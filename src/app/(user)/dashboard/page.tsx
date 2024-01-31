import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div>
        <div>
          Dashboard
        </div>
        <div>
          You are not logged in!
        </div>
      </div>
    )
  }

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