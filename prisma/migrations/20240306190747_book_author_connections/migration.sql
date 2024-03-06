/*
  Warnings:

  - You are about to drop the column `authors` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `BookCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `IndustryIdentifier` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "authors",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "maturityRating" DROP NOT NULL,
ALTER COLUMN "pageCount" DROP NOT NULL,
ALTER COLUMN "publishedDate" DROP NOT NULL,
ALTER COLUMN "publisher" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BookCategory" DROP CONSTRAINT "BookCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BookCategory_id_seq";

-- AlterTable
ALTER TABLE "UserLibraryBook" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorBook" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "AuthorBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryIdentifier_identifier_key" ON "IndustryIdentifier"("identifier");

-- AddForeignKey
ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Author"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
