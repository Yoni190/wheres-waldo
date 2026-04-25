-- CreateTable
CREATE TABLE "GameRound" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameRound_pkey" PRIMARY KEY ("id")
);
