interface RecentlyAddedProps {
  isbnList: string[];
}

const RecentlyAdded = ({ isbnList }: RecentlyAddedProps) => {
  return (
    <div className="recently-added-container">
      <h2>Recently Added</h2>
    </div>
  )
}

export default RecentlyAdded