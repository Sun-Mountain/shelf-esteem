# Shelf Esteem

**Disclaimer**: This was made as a personal coding project and is not intended for commercial use. Third-party integration is subject to their terms. Shelf Esteem does not endorse specific content, and external information accuracy is not guaranteed.

This is a simple library tracker app built with Next.js and Prisma. It allows users to keep track of books in their library, including details such as title, author, and publication date.

## Features
- Add new books to the library
- View a list of all books in the library
- Edit book details ** ~ Coming Soon ~ **
- Delete books from the library

## Technologies Used
- Next.js
- Prisma
- PostgreSQL
- React
- Node.js

## Installation
1. Clone repository
```
https://github.com/Sun-Mountain/shelf-esteem
```

2. Install dependences
```
pnpm install
```

3. Set up `.env` file in root folder
```
APP_ENV="development"

BOOK_API_KEY="XXXXXXX"
BOOK_API_URL="XXXXXXX"

NEXTAUTH_SECRET="secret"
NEXTAUTH_URL="http://localhost:4000"

DATABASE_URL="XXXXXX"

POSTGRES_USER="XXXXXX"
```

4. Set up the database:
    - Create a PostgreSQL database for the app
    - Update the `DATABASE_URL` and `POSTGRES_USER` variables in `.env` folder

5. Run database migrations
```
npx prisma migrate dev
```

6. Connect to book api

The current iteration of this app utilizes the Google Books API. You will need to create an account in order to get an API key that will allow you to make API calls.

7. Start development server
```
pnpm dev
```

8. Open app in new browser
```
http://localhost:4000
```