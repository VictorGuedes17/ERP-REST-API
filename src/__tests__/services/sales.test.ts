import { getCurrentMonth } from "../../helpers/getCurrentMonth";
import SalesRepository from "../../repositories/sales";
import SalesService from "../../services/sales";
import { mockSaleOmited, mockSaleStock } from "../mocks/sale";

describe('#Sales Service', () => {
  jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7));

  describe('#createSale method', () => {
    it('should call repository with correctly params', async () => {
      const salesRepository = jest.spyOn(SalesRepository.prototype, 'registerSale').mockResolvedValueOnce(null);
      await new SalesService().createSale(mockSaleOmited, 1, 10);
      expect(salesRepository).toHaveBeenCalledWith(mockSaleOmited, 1, 10);
    });

    it('should return null when query fail', async () => {
      jest.spyOn(SalesRepository.prototype, 'registerSale').mockResolvedValueOnce(null);
      const service = await new SalesService().createSale(mockSaleOmited, 1, 10);
      expect(service).toBeNull();
    });
  });

  describe('#getCommission method', () => {
    it('should call repository with correctly params', async () => {
      const salesRepository = jest.spyOn(SalesRepository.prototype, 'getComissionFromSeller').mockRejectedValue(null);
      await new SalesService().getCommision(1);
      expect(salesRepository).toHaveBeenCalledWith(1, getCurrentMonth().startOf, getCurrentMonth().endOf);
    });

    it('should return null when query fail', async () => {
      jest.spyOn(SalesRepository.prototype, 'getComissionFromSeller').mockRejectedValue(null);
      const service = await new SalesService().getCommision(1);
      expect(service).toBeNull();
    });

    it('should return null when query fail', async () => {
      jest.spyOn(SalesRepository.prototype, 'getComissionFromSeller').mockResolvedValue([{
        ...mockSaleStock,
      }, {
        ...mockSaleStock,
      }]);
      const service = await new SalesService().getCommision(1);
      expect(service).toEqual(3);
    });
  })

});
