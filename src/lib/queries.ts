export async function createUserLibraryBook(isbn: string) {
  fetch('/api/userLibraryBooks', {
    method: 'POST',
    body: JSON.stringify({ isbn }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}