import { Sales, Stock } from "@prisma/client";
import { getCurrentMonth } from "../helpers/getCurrentMonth";
import { ISalesStock } from "../interfaces/ISalesStock";
import SalesRepository from "../repositories/sales";

export default class SalesService {
  private salesRepository: SalesRepository;
  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async createSale(createData: Omit<Sales, "id" | "saleman" | "created_at" | "updated_at">, userId: number, itemQuantity: number): Promise<[Stock, Sales] | null> {
    try {
      return this.salesRepository.registerSale(createData, userId, itemQuantity);
    } catch (error) {
      return null;
    }
  }

  public async getCommision(userId: number, startOf: string = getCurrentMonth().startOf, endOf: string = getCurrentMonth().endOf): Promise<number | null> {
    try {
      const sales = await this.salesRepository.getComissionFromSeller(userId, startOf, endOf);
      const total = sales.reduce((prev, current) => {
        return prev + ((Number(current.stock.commission) * Number(current.stock.price) / 100) * current.sold_amount);
      }, 0)
      return total;
    } catch (error) {
      return null;
    }
  }

  public async findAllCommisions(startOf: string = getCurrentMonth().startOf, endOf: string = getCurrentMonth().endOf, order: "asc" | "desc" = "asc"): Promise<ICommissions[] | null> {
    try {
      const sales = await this.salesRepository.getComissions(startOf, endOf, order);
      let comissions: ICommissions[] = []
      for (let sale of sales) {
        comissions.push({
          name: sale.sale?.name || "",
          commission: (Number(sale.stock.commission) * Number(sale.stock.price) / 100) * sale.sold_amount,
          item: sale.stock.description
        })
      }
      return comissions;
    } catch (error) {
      return null;
    }
  }
}
