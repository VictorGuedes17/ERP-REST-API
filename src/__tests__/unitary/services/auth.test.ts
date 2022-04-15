import { User } from '@prisma/client';
import UserRepository from '../../../repositories/user';
import AuthService from '../../../services/auth';
import HttpStatusCode from '../../../typings/enums/HttpStatusCodeEnum';

describe('Auth service', () => {
  const mockUser = "defaultUser";
  const mockPassword = "123456";

  const mockDate = new Date(1466424490000);

  describe("When the user is not found", () => {

    it("should call findUser with user", () => {
      const mockedAuthRepository = jest.spyOn(UserRepository.prototype, 'findUsername').mockResolvedValueOnce(null);
      new AuthService().autentication(mockUser, mockPassword);
      expect(mockedAuthRepository).toHaveBeenCalledWith(mockUser);
    })

    it("should return user not found", async () => {
      jest.spyOn(UserRepository.prototype, 'findUsername').mockResolvedValueOnce(null);
      const autentication = await new AuthService().autentication(mockUser, mockPassword);
      expect(autentication).toEqual({ error: { message: "user not found" }, status: HttpStatusCode.NOT_FOUND });
    })

  })

  describe("When the user is inactive", () => {

    it("should return status unautorized", async () => {

      jest.spyOn(UserRepository.prototype, 'findUsername').mockResolvedValueOnce({
        id: 1,
        username: "usuario1",
        email: "usuario1@teste.com",
        password: "123456",
        state: 'INACTIVE',
        createdAt: mockDate,
        updatedAt: mockDate
      });

      const autentication = await new AuthService().autentication(mockUser, mockPassword);
      expect(autentication).toEqual({ error: { message: "user inactive" }, status: HttpStatusCode.UNAUTHORIZED });
    })

  })

  describe("When the password is invalid", () => {
    it("should return status unautorized", async () => {
      jest.spyOn(UserRepository.prototype, 'findUsername').mockResolvedValueOnce({
        id: 1,
        username: "usuario1",
        email: "usuario1@teste.com",
        password: "123456",
        state: 'ACTIVE',
        createdAt: mockDate,
        updatedAt: mockDate
      });

      jest.spyOn(UserRepository.prototype, 'passwordValidator').mockResolvedValueOnce(null);
      const autentication = await new AuthService().autentication(mockUser, mockPassword);
      expect(autentication).toEqual({ error: { message: "invalid password" }, status: HttpStatusCode.UNAUTHORIZED });
    })
  })

  describe("When passed correctly data", () => {

    it("should return status 200", async () => {

      const mockUserData = {
        id: 1,
        username: "usuario1",
        email: "usuario1@teste.com",
        password: "123456",
        state: 'ACTIVE',
        createdAt: mockDate,
        updatedAt: mockDate
      } as User;

      jest.spyOn(UserRepository.prototype, 'findUsername').mockResolvedValueOnce(mockUserData);

      jest.spyOn(UserRepository.prototype, 'passwordValidator').mockResolvedValueOnce(mockUserData);

      const autentication = await new AuthService().autentication(mockUser, mockPassword);
      expect(autentication).toEqual({
        data: mockUserData, 
        status: HttpStatusCode.OK
      });
    })
  })


})