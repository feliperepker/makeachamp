-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champ" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Champ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChampToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamParticipants_AB_unique" ON "_TeamParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamParticipants_B_index" ON "_TeamParticipants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChampToTeam_AB_unique" ON "_ChampToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ChampToTeam_B_index" ON "_ChampToTeam"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamParticipants" ADD CONSTRAINT "_TeamParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamParticipants" ADD CONSTRAINT "_TeamParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChampToTeam" ADD CONSTRAINT "_ChampToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Champ"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChampToTeam" ADD CONSTRAINT "_ChampToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
