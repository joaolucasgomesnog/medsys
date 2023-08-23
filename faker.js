const { PrismaClient } = require('@prisma/client');
const faker = require('faker')

const prisma = new PrismaClient();

function generateElevenDigitNumber() {
    const randomNumber = faker.number({ min: 1, max: 99999999999 }); // Gera um número até 11 dígitos
    return randomNumber.toString().padStart(11, '0'); // Formata para ter 11 dígitos, adicionando zeros à esquerda, se necessário
  }


async function main() {
  // Preencha com dados falsos usando o faker e o Prisma
  for (let i = 0; i < 10; i++) {
    await prisma.paciente.create({
      data: {
        cpf: generateElevenDigitNumber(),
        nome: faker.person.fullName(),
        rg: faker.number.int({ min: 10000000000, max: 99999999999 }),
        datNascimento: faker.date.past(),
        num_sus: faker.number.int({ min: 10000000, max: 99999999 }),
        endereco: {
          create: {
            cep: faker.number.int({ min: 56900000, max: 56999999 }),
            rua: faker.location.street(),
            numero: faker.location.buildingNumber(),
            bairro: faker.location.county(),
            cidade: faker.location.city()
            
          }
        },
        contato: {
          create: {
            email_1: faker.internet.email(),
            telefone_1: faker.phone.number('879########'),
            email_2: faker.internet.email(),
            telefone_2: faker.phone.number('879########')
          }
        }
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });