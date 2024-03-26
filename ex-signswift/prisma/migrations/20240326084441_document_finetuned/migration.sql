/*
  Warnings:

  - You are about to drop the column `documentDataId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the `DocumentAuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentMeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ShareLink` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_documentDataId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentAuditLog" DROP CONSTRAINT "DocumentAuditLog_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentMeta" DROP CONSTRAINT "DocumentMeta_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentShareLink" DROP CONSTRAINT "DocumentShareLink_documentId_fkey";

-- DropIndex
DROP INDEX "Document_documentDataId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "documentDataId",
DROP COLUMN "teamId",
ADD COLUMN     "ShareLink" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "DocumentAuditLog";

-- DropTable
DROP TABLE "DocumentData";

-- DropTable
DROP TABLE "DocumentMeta";
