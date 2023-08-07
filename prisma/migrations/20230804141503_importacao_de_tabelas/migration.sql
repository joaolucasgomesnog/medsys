-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "cep" TEXT,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "telefone_1" TEXT NOT NULL,
    "telefone_2" TEXT,
    "email_1" TEXT NOT NULL,
    "email_2" TEXT,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT,
    "rg" TEXT,
    "datNascimento" TIMESTAMP(3),
    "num_sus" TEXT,
    "endereco_id" INTEGER NOT NULL DEFAULT 1,
    "contato_id" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enfermeira" (
    "id" SERIAL NOT NULL,
    "coren" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "datNascimento" TIMESTAMP(3) NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "contato_id" INTEGER NOT NULL,

    CONSTRAINT "Enfermeira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "crm" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "datNascimento" TIMESTAMP(3) NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "contato_id" INTEGER NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "contato_id" INTEGER NOT NULL,

    CONSTRAINT "Atendente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prontuario" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "medico_id" INTEGER NOT NULL,
    "data_consulta" TIMESTAMP(3) NOT NULL,
    "sintomas" TEXT,
    "diagnostico" TEXT,
    "receita" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "Prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "medico_id" INTEGER NOT NULL,
    "enfermeira_id" INTEGER NOT NULL,
    "atendente_id" INTEGER NOT NULL,
    "prontuario_id" INTEGER NOT NULL,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfermeira" ADD CONSTRAINT "Enfermeira_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enfermeira" ADD CONSTRAINT "Enfermeira_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medico" ADD CONSTRAINT "Medico_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendente" ADD CONSTRAINT "Atendente_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendente" ADD CONSTRAINT "Atendente_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_medico_id_fkey" FOREIGN KEY ("medico_id") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_enfermeira_id_fkey" FOREIGN KEY ("enfermeira_id") REFERENCES "Enfermeira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_atendente_id_fkey" FOREIGN KEY ("atendente_id") REFERENCES "Atendente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_prontuario_id_fkey" FOREIGN KEY ("prontuario_id") REFERENCES "Prontuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
