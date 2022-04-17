import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user";
import HttpStatusCode from "../typings/enums/HttpStatusCodeEnum";

export default class AuthService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      return null;
    }
  }

  public async autentication(email: string, password: string): Promise<User | null> {
    try {
      return await this.userRepository.getUserByCredentials(email, password);
    } catch (error) {
      return null;
    }
  }
}
