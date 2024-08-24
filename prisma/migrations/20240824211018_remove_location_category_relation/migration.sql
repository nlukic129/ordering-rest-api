/*
  Warnings:

  - You are about to drop the `_CategoryToLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToLocation" DROP CONSTRAINT "_CategoryToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToLocation" DROP CONSTRAINT "_CategoryToLocation_B_fkey";

-- DropTable
DROP TABLE "_CategoryToLocation";
