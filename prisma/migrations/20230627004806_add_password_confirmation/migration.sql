/*
  Warnings:

  - Added the required column `password_confirmation` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_confirmation" TEXT NOT NULL;
