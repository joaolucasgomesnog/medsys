import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async findAllFuncionarios(req, res) {
        try {
            const atendentes = await prisma.atendente.findMany()
            const enfemeiros = await prisma.enfermeira.findMany()
            const medicos = await prisma.medico.findMany()

            res.json(paciente);
        } catch (error) {
            console.error('Erro ao criar paciente:', error);
            res.status(500).json({ error: 'Erro ao criar paciente' });
        }
    },

    async findAllPacientes(req, res) {
        try {
            const pacientes = await prisma.paciente.findMany()
            return res.json(pacientes)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findPacienteById(req, res) {
        try {
            const { id } = req.params
            const paciente = await prisma.paciente.findUnique({ where: { id: Number(id) } })
            if (!paciente) return res.json({ error: "Usuário não existe" })
            return res.json(paciente)

        } catch (error) {
            return res.json({ error })
        }
    },
}
