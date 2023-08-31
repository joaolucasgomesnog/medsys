import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async findAllFuncionarios(req, res) {
        try {
            const atendentes = await prisma.atendente.findMany()
            const enfemeiros = await prisma.enfermeira.findMany()
            const medicos = await prisma.medico.findMany()

            let retorno = new Object();
            retorno.atendentes = atendentes;
            retorno.enfermeiros = enfemeiros;
            retorno.medicos = medicos;
            
            return res.json(retorno)

        } catch (error) {
            return res.json({ error })
        }
    },
}
