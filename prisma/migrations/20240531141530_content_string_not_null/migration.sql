/*
  Warnings:

  - Made the column `content` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL
);
INSERT INTO "new_Blog" ("authorId", "content", "createdAt", "filePath", "id", "imagePath", "published", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "filePath", "id", "imagePath", "published", "title", "updatedAt" FROM "Blog";
DROP TABLE "Blog";
ALTER TABLE "new_Blog" RENAME TO "Blog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
