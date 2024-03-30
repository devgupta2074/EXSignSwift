/*
  Warnings:

  - You are about to drop the column `ShareLink` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "ShareLink",
DROP COLUMN "deletedAt";
