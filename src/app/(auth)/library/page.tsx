import AddBookForm from "@/components/Forms/AddBookForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Library = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <h1>Catalog Your Library</h1>
      <AddBookForm userId={session?.user.id} />
    </section>
  )
}

export default Library