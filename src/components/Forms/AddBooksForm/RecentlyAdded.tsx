import { useSession } from "next-auth/react";

interface RecentlyAddedProps {
  isbnList: string[];
}

const RecentlyAdded = ({ isbnList }: RecentlyAddedProps) => {
  const { data: session, status } = useSession();
  return (
    <div className="recently-added-container">
      <h2>Recently Added</h2>
      {isbnList.map((isbn, index) => (
        <p key={index}>{isbn}</p>
      ))}
    </div>
  )
}

export default RecentlyAdded;