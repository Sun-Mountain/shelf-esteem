export const fetchBookData = async (isbn:string) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${isbn}`)
                      .then(response => response.json())
                      .then(data => {
                        const bookData = JSON.stringify(data.docs[0]);
                        return bookData;
                      })
                      .catch(error => {
                        console.error(error);
                      });

  return response;
}