/*
  Warnings:

  - You are about to drop the column `customText` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `inserted` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `positionX` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Field` table. All the data in the column will be lost.
  - Added the required column `text` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Field_templateId_idx";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "customText",
DROP COLUMN "inserted",
DROP COLUMN "positionX",
DROP COLUMN "positionY",
DROP COLUMN "templateId",
DROP COLUMN "type",
ADD COLUMN     "left" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "top" DECIMAL(65,30) NOT NULL DEFAULT 0;
