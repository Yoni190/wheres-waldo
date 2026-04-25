-- CreateTable
CREATE TABLE "FoundCharacter" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "foundAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoundCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoundCharacter_roundId_idx" ON "FoundCharacter"("roundId");

-- CreateIndex
CREATE INDEX "FoundCharacter_characterId_idx" ON "FoundCharacter"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "FoundCharacter_roundId_characterId_key" ON "FoundCharacter"("roundId", "characterId");

-- AddForeignKey
ALTER TABLE "FoundCharacter" ADD CONSTRAINT "FoundCharacter_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "GameRound"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundCharacter" ADD CONSTRAINT "FoundCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
