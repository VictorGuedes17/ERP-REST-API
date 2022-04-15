import { ICreateClientData } from "../../../interfaces/ICreateClientData";
import ClientsRepository from "../../../repositories/clients";
import { ClientsService } from "../../../services/clients";
import HttpStatusCode from "../../../typings/enums/HttpStatusCodeEnum";


const mockDate = new Date(12312312313);
describe("#Clients Service", () => {

  describe("Create new cliente POST /clients", () => {

    it("should call createClient with clientData", () => {

      const mockClient: ICreateClientData = {
        "first_name": "Victor",
        "last_name": "Faria",
        "user": {
          "username": "victorguedes22",
          "email": "lacuncaratia5@gmail.com",
          "password": "123456"
        }
      }

      const mockedClientsRepository = jest.spyOn(ClientsRepository.prototype, 'createClient');
      new ClientsService().createUser(mockClient);
      expect(mockedClientsRepository).toHaveBeenCalledWith(mockClient);

    })


    it("should return status 422 when client creation fails", async () => {

      const mockClient: ICreateClientData = {
        "first_name": "Victor",
        "last_name": "Faria",
        "user": {
          "username": "victorguedes22",
          "email": "lacuncaratia5@gmail.com",
          "password": "123456"
        }
      }

      jest.spyOn(ClientsRepository.prototype, 'createClient').mockResolvedValueOnce(null);
      const create = await new ClientsService().createUser(mockClient);
      expect(create).toEqual({ error: { message: "create client fail" }, status: HttpStatusCode.UNPROCESSABLE_ENTITY });

    })

    it("should return status 200 and Client when client creation success", async () => {

      const mockClient: ICreateClientData = {
        "first_name": "Victor",
        "last_name": "Faria",
        "user": {
          "username": "victorguedes22",
          "email": "lacuncaratia5@gmail.com",
          "password": "123456"
        }
      }

      const mockClientReturn = {
        "id": 1,
        "first_name": "Victor",
        "last_name": "Faria2",
        "birth": null,
        "photo": null,
        "cpf": null,
        "phone": null,
        "complementary_phone": null,
        "createdAt": mockDate,
        "updatedAt": mockDate,
        "userId": 105,
        "addressId": null
      }

      jest.spyOn(ClientsRepository.prototype, 'createClient').mockResolvedValueOnce({ ...mockClientReturn });
      const create = await new ClientsService().createUser(mockClient);
      expect(create).toEqual({ data: mockClientReturn, status: HttpStatusCode.OK });

    })

  })


})