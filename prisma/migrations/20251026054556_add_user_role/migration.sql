-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PRAKTIKAN', 'ASISTEN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'PRAKTIKAN';
