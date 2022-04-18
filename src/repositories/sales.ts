import { PrismaClient, Sales, Stock } from "@prisma/client";
import { ISalesStock } from "../interfaces/ISalesStock";

export default class SalesRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async registerSale(createData: Omit<Sales, "id" | "saleman" | "created_at" | "updated_at">, userId: number, itemQuantity: number): Promise<[Stock, Sales] | null> {
    const { discount, sold_amount, stock_id } = createData;

    return await this.prisma.$transaction([
      this.prisma.stock.update({
        data: {
          quantity: itemQuantity - sold_amount
        },
        where: {
          id: stock_id
        }
      }),

      this.prisma.sales.create({
        data: {
          discount,
          sold_amount,
          stock: {
            connect: {
              id: stock_id
            },
          },
          sale: {
            connect: {
              id: userId
            }
          },
        }
      })
    ])
  }

  public async getComissionFromSeller(userId: number, startOf: string, endOf: string): Promise<ISalesStock[]> {
    return await this.prisma.sales.findMany({
      where: {
        AND: [
          {
            saleman: {
              equals: userId
            }
          },
          {
            created_at: {
              gte: `${startOf}T00:00:00.000Z`,
              lt: `${endOf}T23:59:59.999Z`
            }
          }
        ]
      },
      include: {
        stock: true
      }
    })
  }

  public async getComissions(startOf: string, endOf: string, order: "asc" | "desc"): Promise<ISalesStock[]> {
    return await this.prisma.sales.findMany({
      where: {
        created_at: {
          gte: `${startOf}T00:00:00.000Z`,
          lt: `${endOf}T23:59:59.999Z`
        }
      },
      orderBy: {
        created_at: order
      },
      include: {
        stock: true,
        sale: {
          select: {
            name: true
          }
        }
      }
    })
  }
}
