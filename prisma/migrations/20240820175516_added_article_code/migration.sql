/*
  Warnings:

  - Added the required column `code` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "article" ADD COLUMN     "code" TEXT NOT NULL;
