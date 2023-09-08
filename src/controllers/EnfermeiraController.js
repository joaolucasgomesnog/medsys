import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async createEnfermeira(req, res) {
        const { coren, nome, cpf, rg, datNascimento, endereco, contato } = req.body;

        try {
            const enfermeira = await prisma.enfermeira.create({
                data: {
                    coren: coren,
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

            res.json(enfermeira);
        } catch (error) {
            console.error('Erro ao criar enfermeira:', error);
            res.status(500).json({ error: 'Erro ao criar enfermeira' });
        }
    },

    async findAllEnfermeiras(req, res) {
        try {
            const enfermeiras = await prisma.enfermeira.findMany()
            return res.json(enfermeiras)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findEnfermeiraById(req, res) {
        try {
            const { id } = req.params
            const enfermeira = await prisma.enfermeira.findUnique({ where: { id: Number(id) } })
            if (!enfermeira) return res.json({ error: "Enfermeira não existe" })
            return res.json(enfermeira)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findEnfermeiraByAll(req, res) {
        try {
            const { nome } = req.params;
            const enfermeiras = await prisma.$queryRaw`
            SELECT * FROM "Enfermeira"
            WHERE LOWER("nome") LIKE ${`%${nome.toLowerCase()}%`}
            OR "cpf" LIKE ${`%${nome}%`}
            OR "rg" LIKE ${`%${nome}%`};
            
        `;
    
            if (!enfermeiras || enfermeiras.length === 0) {
                return res.json({ error: "Enfermeira não existe" });
            }
    
            return res.json(enfermeiras);
        } catch (error) {
            console.error("Erro ao buscar enfermeiras:", error);
            return res.status(500).json({ error: "Ocorreu um erro ao buscar enfermeiras." });
        }
    },
    async updateEnfermeira(req, res) {
        try {
            const { id } = req.params

            const { coren, nome, cpf, rg, datNascimento, endereco, contato } = req.body;
            const { cep, rua, numero, bairro, cidade } = endereco;
            const { email_1, telefone_1 } = contato;

            let enfermeira = await prisma.enfermeira.findUnique({ where: { id: Number(id) } })
            if (!enfermeira)
                return res.status(404).json({ error: "Enfermeira não existe" })

            enfermeira = await prisma.enfermeira.update({ 
                where: { id: Number(id) }, 
                data: { 
                    coren,
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
            return res.json(enfermeira)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possível atualizar a enfermeira" }) 
        }
    },

    async deleteEnfermeiraById(req, res) {
        try {
            const { id } = req.params
            let enfermeira = await prisma.enfermeira.findUnique({ where: { id: Number(id) } })
            if (!enfermeira) return res.json({ error: "Enfermeira não existe" })
            await prisma.enfermeira.delete({ where: { id: Number(id) } })
            return res.json({message: "Enfermeira deletada"})
        } catch (error) {
            return res.json({ error })
        }
    },
}
