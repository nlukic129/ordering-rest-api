/*
  Warnings:

  - You are about to drop the column `dispay_name` on the `location` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "dispay_name",
ADD COLUMN     "display_name" TEXT NOT NULL;
