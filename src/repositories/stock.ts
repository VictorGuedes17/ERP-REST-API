import { PrismaClient, Stock } from "@prisma/client";

export default class StockRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: number): Promise<Stock | null> {
    return await this.prisma.stock.findUnique({
      where: { id }
    })
  }

  async create(data: Omit<Stock, "id"|"createdAt"|"updatedAt"|"created_by">, userId: number): Promise<Stock | null> {
    return await this.prisma.stock.create({ data: {
     ...data,
      user: {
        connect: {
          id: userId
        }
      }
    } })
  }

  async findAll(skip: number, take: number, filters: Partial<Stock>): Promise<Stock[] | null> {
    if (!filters) {
      return await this.prisma.stock.findMany({
        skip,
        take,
      });
    }

    return await this.prisma.stock.findMany({
      skip,
      take,
      where: { ...filters }
    });
  }

  async updateById(stockId: number, changes: Stock): Promise<Stock | null> {
    const user = await this.findById(stockId);
    if(!user) return null;

    const { id, createdAt } = user;
    return await this.prisma.stock.update({
      data: {
        ...changes,
        id,
        createdAt
      },
      where: {
        id
      }
    })
  }
}
