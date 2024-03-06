import { RecentlyAddedBooksProps } from "@/types";
import BookListItem from "@/components/BookListItem";

const RecentlyAddedBooks = ({
  recentlyAdded,
}: RecentlyAddedBooksProps) => {
  return (
    <div className="recently-added-container">
      <h2>Recently Added</h2>
      {recentlyAdded.map((book) => {
        return <BookListItem book={book} key={book.id} />;
      })}
    </div>
  )
}

export default RecentlyAddedBooks