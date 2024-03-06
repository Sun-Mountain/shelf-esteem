interface BookItemAuthorProps {
  authorName: string,
  bookId: string,
  id: string
}

interface BookItemProps {
  id: string,
  authors: BookItemAuthorProps[],
  isbn: string,
  thumbnail: string,
  title: string
}

interface RecentlyAddedBooksProps {
  recentlyAdded: BookItemProps
}

const RecentlyAddedBooks = ({
  recentlyAdded,
}: RecentlyAddedBooksProps) => {
  return (
    <div className="recently-added-container">
      <h2>Recently Added</h2>
      {recentlyAdded.map((book) => {
        const authors = book.authors.map((author) => author.authorName).join(', ');
        return (
          <div className="library-book-item" key={book.id}>
            <div className="thumbnail-container">
              <img src={book.thumbnail} alt={book.title} />
            </div>
            <div className="book-info">
              <div>{book.title}</div>
              <div className="isbn-container">{book.isbn}</div>
              <div>{authors}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default RecentlyAddedBooks