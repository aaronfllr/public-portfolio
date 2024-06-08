/*
  Warnings:

  - A unique constraint covering the columns `[filePath]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resume_filePath_key" ON "Resume"("filePath");
