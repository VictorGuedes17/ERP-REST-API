import { Stock } from "@prisma/client";
import StockRepository from "../repositories/stock";

export default class StockService {
  private stockRepository: StockRepository;

  constructor() {
    this.stockRepository = new StockRepository();
  }

  public async findByStockId(id: number): Promise<Stock | null> {
    try {
      return await this.stockRepository.findById(id);
    } catch (error) {
      return null;
    }
  }

  public async create(data: Omit<Stock, "id"|"createdAt"|"updatedAt"|"created_by">, userId: number): Promise<Stock | null> {
    try {
      return await this.stockRepository.create(data, userId);
    } catch (error) {
      return null;
    }
  }

  public async findAllItens(page: number = 1, filters: Partial<Stock>): Promise<Stock[] | null> {
    try {
      const limitPerPage = 10;
      const skip = page === 1 ? 0 : limitPerPage;

      return await this.stockRepository.findAll(skip, limitPerPage, filters);
    } catch (error) {
      return null;
    }
  }

  public async changeStock(id: number, data: Stock): Promise<Stock | null> {
    try {
      return await this.stockRepository.updateById(id, data);
    } catch (error) {
      return null;
    }
  }
}
