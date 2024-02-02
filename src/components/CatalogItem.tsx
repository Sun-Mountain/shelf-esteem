
interface CatalogItemProps {
  isbn: string;
  isbnIndex: number;
  bookData: any[];
}

const CatalogItem = ({
  isbn,
  isbnIndex,
  bookData
}: CatalogItemProps) => {



  return (
    <div className="catalog-item">
      {isbn}
    </div>
  )
}

export default CatalogItem