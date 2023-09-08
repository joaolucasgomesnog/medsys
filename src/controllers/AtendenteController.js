import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default{

    async createAtendente(req, res) {
        const { nome, cpf, rg, endereco, contato } = req.body;

        try {
            const atendente = await prisma.atendente.create({
                data: {
                    nome: nome,
                    cpf: cpf,
                    rg: rg,
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

            res.json(atendente);
        } catch (error) {
            console.error('Erro ao criar atendente:', error);
            res.status(500).json({ error: 'Erro ao criar atendente' });
        }
    },

    async findAllAtendentes(req, res) {
        try {
            const atendentes = await prisma.atendente.findMany()
            return res.json(atendentes)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findAtendenteById(req, res) {
        try {
            const { id } = req.params
            const atendente = await prisma.atendente.findUnique({ where: { id: Number(id) } })
            if (!atendente) return res.json({ error: "Atendente não existe" })
            return res.json(atendente)

        } catch (error) {
            return res.json({ error })
        }
    },

    async findAtendenteByAll(req, res) {
        try {
            const { nome } = req.params;
            const atendentes = await prisma.$queryRaw`
            SELECT * FROM "Atendente"
            WHERE LOWER("nome") LIKE ${`%${nome.toLowerCase()}%`}
            OR "cpf" LIKE ${`%${nome}%`}
            OR "rg" LIKE ${`%${nome}%`};
            
        `;
    
            if (!atendentes || atendentes.length === 0) {
                return res.json({ error: "Atendente não existe" });
            }
    
            return res.json(atendentes);
        } catch (error) {
            console.error("Erro ao buscar atendentes:", error);
            return res.status(500).json({ error: "Ocorreu um erro ao buscar atendentes." });
        }
    },

    async updateAtendente(req, res) {
        try {
            const { id } = req.params

            const { nome, cpf, rg, endereco, contato } = req.body;
            const { cep, rua, numero, bairro, cidade } = endereco;
            const { email_1, telefone_1 } = contato;

            let atendente = await prisma.atendente.findUnique({ where: { id: Number(id) } })
            if (!atendente)
                return res.status(404).json({ error: "Atendente não existe" })

            atendente = await prisma.atendente.update({ 
                where: { id: Number(id) }, 
                data: { 
                    nome, 
                    cpf, 
                    rg, 
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
            return res.json(atendente)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar o atendente" }) 
        }
    },

    async deleteAtendenteById(req, res) {
        try {
            const { id } = req.params
            let atendente = await prisma.atendente.findUnique({ where: { id: Number(id) } })
            if (!atendente) return res.json({ error: "Atendente não existe" })
            await prisma.atendente.delete({ where: { id: Number(id) } })
            return res.json({message: "Atendente deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}