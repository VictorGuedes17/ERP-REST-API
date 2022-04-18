import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user";
import AuthService from "../../services/auth";

describe('#Auth Service', () => {
  jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7));

  let mockResolveRepo = {
    id: 1,
    email: "administrador@erp.com.br",
    name: "Administrador",
    password: "12345",
    type: "ADMINISTRATOR",
    updated_at: new Date(),
    created_at: new Date()
  } as User;

  describe('#getUserByEmail method', () => {
    it('should call repository with received email', async () => {
      const mockedUserRepository = jest.spyOn(UserRepository.prototype, 'getUserByEmail').mockResolvedValueOnce(null);
      new AuthService().getUserByEmail("administrador@erp.com.br");
      expect(mockedUserRepository).toHaveBeenCalledWith("administrador@erp.com.br");
    });

    it("should return user not found", async () => {
      jest.spyOn(UserRepository.prototype, 'getUserByEmail').mockResolvedValueOnce(null);
      const service = await new AuthService().getUserByEmail("");
      expect(service).toBeNull();
    })

    it("should returns user data", async () => {
      jest.spyOn(UserRepository.prototype, 'getUserByEmail').mockResolvedValueOnce(mockResolveRepo);
      const service = await new AuthService().getUserByEmail("administrador@erp.com.br");
      expect(service).toEqual(mockResolveRepo);
    })
  });

  describe('#autentication method', () => {
    it('should call repository with received email and password', async () => {
      const mockedUserRepository = jest.spyOn(UserRepository.prototype, 'getUserByCredentials').mockResolvedValueOnce(null);
      new AuthService().autentication("adm@erp.com.br", "123455");
      expect(mockedUserRepository).toHaveBeenCalledWith("adm@erp.com.br", "123455");
    });

    it("should return user not found", async () => {
      jest.spyOn(UserRepository.prototype, 'getUserByCredentials').mockResolvedValueOnce(null);
      const service = await new AuthService().autentication("adm@erp.com.br", "123455");
      expect(service).toBeNull();
    })

    it("should returns user data", async () => {
      jest.spyOn(UserRepository.prototype, 'getUserByCredentials').mockResolvedValueOnce(mockResolveRepo);
      const service = await new AuthService().autentication("administrador@erp.com.br", "12345");
      expect(service).toEqual(mockResolveRepo);
    })
  });

});
