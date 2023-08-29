import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

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


    async findAllFuncionarios(req, res) {
        try {
            const atendentes = await prisma.atendente.findMany()
            const enfemeiros = await prisma.enfermeira.findMany()
            
            let retorno = new Object();
            retorno.atendentes = atendentes;
            retorno.enfermeiros = enfemeiros
            
            return res.json(retorno)

        } catch (error) {
            return res.json({ error })
        }
    },
}
