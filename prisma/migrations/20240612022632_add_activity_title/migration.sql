/*
  Warnings:

  - Added the required column `title` to the `AddedActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddedActivity" ADD COLUMN     "title" TEXT NOT NULL;
