/*
  Warnings:

  - You are about to drop the column `x` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Character` table. All the data in the column will be lost.
  - Added the required column `xMax` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xMin` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yMax` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yMin` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "xMax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "xMin" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yMax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yMin" DOUBLE PRECISION NOT NULL;
