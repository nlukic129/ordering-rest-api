/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `article` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "article_code_key" ON "article"("code");
