import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const router = Router()

router.post("/paciente", async (req, res) => {
    const { cpf, nome, rg, datNascimento, num_sus, endereco, contato } = req.body;
    
    try {
        const paciente = await prisma.paciente.create({
            data: {
                cpf,
                nome,
                rg,
                datNascimento,
                num_sus,
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
                }
            },
            include: {
                endereco: true,
                contato: true
            }
        });
        
        res.json(paciente);
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        res.status(500).json({ error: 'Erro ao criar paciente'});
    }
});


export {router}