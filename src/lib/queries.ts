export const fetchBookData = async (isbn:string) => {
  const response = await fetch(`${process.env.BOOK_API_URL}?q=isbn:${isbn.trim()}&key=${process.env.BOOK_API_KEY}`)
                      .then(response => response.json())
                      .then(data => {
                        const bookData = data.items[0].volumeInfo;
                        return bookData;
                      })
                      .catch(error => {
                        console.error(error);
                        return {};
                      });

  return response;
}