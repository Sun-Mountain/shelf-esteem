interface BookDataProps {
  isbn: string;
  authors?: string[];
  subtitle?: string;
  thumbnail?: string;
  title?: string;
  addedOn?: Date;
}

const BookData = ({
  isbn,
  authors,
  subtitle,
  thumbnail,
  title,
  addedOn
}: BookDataProps) => {
  const date = new Date(addedOn);

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
      <h6 className={`title-container ${!!subtitle && 'has-subtitle'}`}>
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
      <div className="actions">
        { addedOn && (
          <div className="added-on">
            Added on: { date.toDateString() }
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default BookData