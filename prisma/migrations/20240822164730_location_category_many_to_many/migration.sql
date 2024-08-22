-- CreateTable
CREATE TABLE "_CategoryToLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToLocation_AB_unique" ON "_CategoryToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToLocation_B_index" ON "_CategoryToLocation"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToLocation" ADD CONSTRAINT "_CategoryToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLocation" ADD CONSTRAINT "_CategoryToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "location"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
