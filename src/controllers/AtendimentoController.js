import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

const prisma = new PrismaClient()

export default {

    async createAtendimento(req, res) {
        const { data, paciente_id, enfermeira_id, medico_id, diagnostico, observacoes, receita, sintomas} = req.body;

        try {
            const atendimento = await prisma.atendimento.create({
                data: {
                    data: data,
                    paciente_id: paciente_id,
                    atendente_id: paciente_id,
                    enfermeira_id: enfermeira_id,
                    medico_id: medico_id,
                    prontuario: {
                        create: {
                            data_consulta: data,
                            medico_id: medico_id,
                            paciente_id: paciente_id,
                            diagnostico: diagnostico,
                            observacoes: observacoes,
                            receita: receita,
                            sintomas: sintomas
                        }
                    },
                    status: 0
                },
                include: {
                    prontuario: true,
                }
            });

            res.json(atendimento);
        } catch (error) {
            console.error('Erro ao criar atendimento:', error);
            res.status(500).json({ error: 'Erro ao criar atendimento' });
        }
    },

    async findAllAtendimentos(req, res) {
        try {
            const atendimentos = await prisma.atendimento.findMany()
            return res.json(atendimentos)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findAtendimentoById(req, res) {
        try {
            const { id } = req.params
            const atendimento = await prisma.atendimento.findUnique({ where: { id: Number(id) }, include : {endereco: true, contato: true}})
            if (!atendimento) return res.json({ error: "Atendimento não existe" })
            return res.json(atendimento)

        } catch (error) {
            return res.json({ error })
        }
    },
    async findAtendimentoByAll(req, res) {
        try {
            const { nome } = req.params;
            const atendimentos = await prisma.$queryRaw`
            SELECT * FROM "Atendimento"
            WHERE LOWER("nome") LIKE ${`%${nome.toLowerCase()}%`}
            OR "cpf" LIKE ${`%${nome}%`}
            OR "num_sus" LIKE ${`%${nome}%`}
            OR "rg" LIKE ${`%${nome}%`};
            
        `;
    
            if (!atendimentos || atendimentos.length === 0) {
                return res.json({ error: "Usuário não existe" });
            }
    
            return res.json(atendimentos);
        } catch (error) {
            console.error("Erro ao buscar atendimentos:", error);
            return res.status(500).json({ error: "Ocorreu um erro ao buscar atendimentos." });
        }
    },
    async updateAtendimento(req, res) {
        try {
            const { id } = req.params

            const { cpf, nome, rg, datNascimento, num_sus, endereco, contato } = req.body;
            const { cep, rua, numero, bairro, cidade } = endereco;
            const { email_1, telefone_1 } = contato;

            let atendimento = await prisma.atendimento.findUnique({ where: { id: Number(id) } })
            if (!atendimento)
                return res.status(404).json({ error: "Usuário não existe" })

                atendimento = await prisma.atendimento.update({ 
                    where: { id: Number(id) }, 
                    data: {
                        data,
                        paciente_id,
                        atendente_id,
                        enfermeira_id,
                        medico_id,
                        prontuario: {
                            create: {
                                data_consulta,
                                medico_id,
                                paciente_id,
                                diagnostico,
                                observacoes,
                                receita,
                                sintomas
                            }
                        },
                        status
                    }
                });
            return res.json(atendimento)

        } catch (error) { 
            console.error(error)
            return res.status(500).json({ error: "Não foi possivel atualizar o atendimento" }) }
    },


    async deleteAtendimentoById(req, res) {
        try {
            const { id } = req.params
            let atendimento = await prisma.atendimento.findUnique({ where: { id: Number(id) } })
            if (!atendimento) return res.json({ error: "Usuário não existe" })
            await prisma.atendimento.delete({ where: { id: Number(id) } })
            return res.json({message: "Atendimento deletado"})
        } catch (error) {
            return res.json({ error })
        }
    },
}