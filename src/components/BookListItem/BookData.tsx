interface BookDataProps {
  isbn: string;
  authors?: string[];
  subtitle?: string;
  thumbnail?: string;
  title?: string;
}

const BookData = ({
  isbn,
  authors,
  subtitle,
  thumbnail,
  title
}: BookDataProps) => {
  return (
    <>
     { thumbnail && (
        <div className="thumbnail-container">
          <img
            src={thumbnail}
            alt={title || isbn}
            className="book-thumbnail"
          />
        </div>
     )}
    <div className="book-details">
      <h6 className="title-container">
        { title || isbn }
      </h6>
      { subtitle && (
        <div className="subtitle-container">
          { subtitle }
        </div>
      )}
      { authors && (
        <div className="authors">
          { authors.join(', ') }
        </div>
      )}
      { !!title && (
        <div className="isbn-container">
          { isbn }
        </div>
      )}
    </div>
    </>
  )
}

export default BookData