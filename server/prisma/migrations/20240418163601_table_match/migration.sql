-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "champId" TEXT,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "dateToPlay" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MatchToTeam_AB_unique" ON "_MatchToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchToTeam_B_index" ON "_MatchToTeam"("B");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_champId_fkey" FOREIGN KEY ("champId") REFERENCES "Champ"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToTeam" ADD CONSTRAINT "_MatchToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToTeam" ADD CONSTRAINT "_MatchToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
