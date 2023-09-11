/*
  Warnings:

  - Made the column `cep` on table `Endereco` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Endereco" ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "cep" SET DEFAULT ' ';
