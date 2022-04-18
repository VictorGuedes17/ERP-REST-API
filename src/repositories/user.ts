import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  public async getUserByCredentials(email: string, password: string):Promise<Omit<User, "password"> | null> {
    return await this.prisma.user.findFirst({
      select: {
        password: false,
        email: true,
        id: true,
        created_at: true,
        name: true,
        type: true,
        status: true,
        updated_at: true
      },
      where: {
        email,
        password
      }
    })
  }
}
