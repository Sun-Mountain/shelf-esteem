import BookListItem from "@/components/BookListItem";

interface RecentlyAddedProps {
  isbnList: string[];
}

const RecentlyAdded = ({ isbnList }: RecentlyAddedProps) => {
  return (
    <div className="recently-added-container">
      <h2>Recently Added</h2>
      {isbnList.map((isbn, index) => (
        <BookListItem key={index} isbn={isbn} />
      ))}
    </div>
  )
}

export default RecentlyAdded;