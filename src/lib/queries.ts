export async function createUserLibraryBook(isbn: string, userId: string) {
  fetch('/api/userLibraryBooks', {
    method: 'POST',
    body: JSON.stringify({ isbn, userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}