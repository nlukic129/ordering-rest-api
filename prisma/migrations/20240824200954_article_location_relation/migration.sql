/*
  Warnings:

  - Added the required column `locationId` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
