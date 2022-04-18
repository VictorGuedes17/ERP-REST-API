import { PrismaClient } from '@prisma/client'
import faker from 'faker';


const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: "administrador@erp.com.br",
        name: "Administrador",
        password: "12345",
        type: "ADMINISTRATOR"
      },
      {
        id: 2,
        email: "vendedor1@erp.com.br",
        name: "vendedor1",
        password: "12345",
        type: "SELLER"
      },
      {
        id: 3,
        email: "vendedor2@erp.com.br",
        name: "vendedor2",
        password: "12345",
        type: "SELLER"
      },
      {
        id: 4,
        email: "almoxarifado@erp.com.br",
        name: "almoxarifado",
        password: "12345",
        type: "WAREHOUSE"
      },
      {
        id: 5,
        email: "financeiro@erp.com.br",
        name: "financeiro",
        password: "12345",
        type: "FINANCIAL"
      },
    ]
  })

  await prisma.stock.createMany({
    data: [
      {
        id: 1,
        description: "Violão cg70 yamaha",
        commission: 10,
        created_by: 4,
        location: "Prateleira 2",
        price: 1150,
        quantity: 10,
      },
      {
        id: 2,
        description: "Violão cg90 yamaha",
        commission: 10,
        created_by: 4,
        location: "Prateleira 1",
        price: 1500,
        quantity: 4,
      },
      {
        id: 3,
        description: "Violão rossini classico",
        commission: 10,
        created_by: 4,
        location: "Prateleira 5",
        price: 1800,
        quantity: 2,
      },
    ]
  })

  await prisma.sales.createMany({
    data: [
      {
        discount: 0,
        saleman: 2,
        sold_amount: 3,
        stock_id: 1,
      },
      {
        discount: 0,
        saleman: 2,
        sold_amount: 4,
        stock_id: 1,
      },
      {
        discount: 20,
        saleman: 3,
        sold_amount: 1,
        stock_id: 3,
      },
    ]
  })

}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
