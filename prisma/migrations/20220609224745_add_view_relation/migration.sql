-- CreateTable
CREATE TABLE "_Views" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Views_AB_unique" ON "_Views"("A", "B");

-- CreateIndex
CREATE INDEX "_Views_B_index" ON "_Views"("B");

-- AddForeignKey
ALTER TABLE "_Views" ADD CONSTRAINT "_Views_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Views" ADD CONSTRAINT "_Views_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
