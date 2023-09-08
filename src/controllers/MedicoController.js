import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async createMedico(req, res) {
        const { crm, nome, cpf, rg, datNascimento, endereco, contato } = req.body;

        try {
            const medico = await prisma.medico.create({
                data: {
                    crm: crm,
                    nome: nome,
                    cpf: cpf,
                    rg: rg,
                    datNascimento: datNascimento,
                    endereco: {
                        create: {
                            cep: endereco.cep,
                            rua: endereco.rua,
                            numero: endereco.numero,
                            bairro: endereco.bairro,
                            cidade: endereco.cidade
                        }
                    },
                    contato: {
                        create: {
                            email_1: contato.email_1,
                            telefone_1: contato.telefone_1
                        }
                    },
                },
                include: {
                    endereco: true,
                    contato: true
                }
            });

            res.json(medico);
        } catch (error) {
            console.error('Erro ao criar médico:', error);
            res.status(500).json({ error: 'Erro ao criar médico' });
        }
    },

    async findAllMedicos(req, res) {
        try {
            const medicos = await prisma.medico.findMany()
            return res.json(medicos)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findMedicoById(req, res) {
        try {
            const { id } = req.params
            const medico = await prisma.medico.findUnique({ where: { id: Number(id) } })
            if (!medico) return res.json({ error: "Médico não existe" })
            return res.json(medico)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findMedicoByAll(req, res) {
        try {
            const { nome } = req.params;
            const medicos = await prisma.$queryRaw`
            SELECT * FROM "Medico"
            WHERE LOWER("nome") LIKE ${`%${nome.toLowerCase()}%`}
            OR "cpf" LIKE ${`%${nome}%`}
            OR "rg" LIKE ${`%${nome}%`};
            
        `;
    
            if (!medicos || medicos.length === 0) {
                return res.json({ error: "Médico não existe" });
            }
    
            return res.json(medicos);
        } catch (error) {
            console.error("Erro ao buscar médicos:", error);
            return res.status(500).json({ error: "Ocorreu um erro ao buscar médicos." });
        }
    },
    async updateMedico(req, res) {
        try {
            const { id } = req.params

            const { crm, nome, cpf, rg, datNascimento, endereco, contato } = req.body;
            const { cep, rua, numero, bairro, cidade } = endereco;
            const { email_1, telefone_1 } = contato;

            let medico = await prisma.medico.findUnique({ where: { id: Number(id) } })
            if (!medico)
                return res.status(404).json({ error: "Médico não existe" })

            medico = await prisma.medico.update({ 
                where: { id: Number(id) }, 
                data: { 
                    crm,
                    nome, 
                    cpf, 
                    rg, 
                    datNascimento, 
                    endereco: {
                        update: {
                            cep,
                            rua,
                            numero,
                            bairro,
                            cidade
                        }
                    },
                    contato: {
                        update: {
                            email_1,
                            telefone_1
                        }
                    }
                } 
            });
            return res.json(medico)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o médico" }) 
        }
    },

    async deleteMedicoById(req, res) {
        try {
            const { id } = req.params
            let medico = await prisma.medico.findUnique({ where: { id: Number(id) } })
            if (!medico) return res.json({ error: "Médico não existe" })
            await prisma.medico.delete({ where: { id: Number(id) } })
            return res.json({message: "Médico deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}
