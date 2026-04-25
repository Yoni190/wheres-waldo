/*
  Warnings:

  - Added the required column `level` to the `GameRound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameRound" ADD COLUMN     "level" INTEGER NOT NULL;
