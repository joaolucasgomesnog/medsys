import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {

    async createUser(req, res) {
        const { cpf, nome, rg, datNascimento, num_sus, endereco, contato } = req.body;

        try {
            const paciente = await prisma.paciente.create({
                data: {
                    cpf: cpf,
                    nome: nome,
                    rg: rg,
                    datNascimento: datNascimento,
                    num_sus: num_sus,
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
    async findPacienteByNome(req, res) {
        try {
            const { nome } = req.params
            const paciente = await prisma.paciente.findUnique({ where: { nome: { contains: nome } } })
            if (!paciente) return res.json({ error: "Usuário não existe" })
            return res.json(paciente)

        } catch (error) {
            return res.json({ error })
        }
    },
    async updatePaciente(req, res) {
        try {
            const { id } = req.params

            const { cpf, nome, rg, datNascimento, num_sus, endereco, contato } = req.body;
            const { cep, rua, numero, bairro, cidade } = endereco;
            const { email_1, telefone_1 } = contato;

            let paciente = await prisma.paciente.findUnique({ where: { id: Number(id) } })
            if (!paciente)
                return res.status(404).json({ error: "Usuário não existe" })

                paciente = await prisma.paciente.update({ 
                    where: { id: Number(id) }, 
                    data: { 
                        cpf, 
                        nome, 
                        rg, 
                        datNascimento, 
                        num_sus, 
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
            return res.json(paciente)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possivel atualizar o paciente" }) }
    },


    async deletePacienteById(req, res) {
        try {
            const { id } = req.params
            let paciente = await prisma.paciente.findUnique({ where: { id: Number(id) } })
            if (!paciente) return res.json({ error: "Usuário não existe" })
            await prisma.paciente.delete({ where: { id: Number(id) } })
            return res.json({message: "Paciente deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}