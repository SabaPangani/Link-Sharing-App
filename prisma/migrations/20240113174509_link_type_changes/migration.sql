/*
  Warnings:

  - The `order` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[platform]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "order",
ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Link_platform_key" ON "Link"("platform");
