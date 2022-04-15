import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUserByCredentials(email: string, password: string):Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
        password
      }
    })
  }
}