/*
  Warnings:

  - You are about to drop the column `createdDate` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[post_id]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `Images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" DROP COLUMN "createdDate",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "title",
DROP COLUMN "updateDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_post_id_key" ON "Images"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Images_image_id_key" ON "Images"("image_id");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
