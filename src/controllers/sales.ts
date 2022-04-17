import { Sales } from '@prisma/client';
import { Request, Response } from 'express';
import { isValidStockQuantity } from '../helpers/isValidStockQuantity';
import SalesService from "../services/sales";
import StockService from '../services/stock';
import HttpStatusCode from '../typings/enums/HttpStatusCodeEnum';

export default class SalesController {
  private saleService: SalesService;
  private stockService: StockService;

  constructor() {
    this.saleService = new SalesService();
    this.stockService = new StockService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as Omit<Sales, "id" | "saleman" | "created_at" | "updated_at">;

    const stockItem = await this.stockService.findByStockId(data.stock_id);
    const isValidStock = isValidStockQuantity(stockItem, data.sold_amount);
    if (!stockItem || !isValidStock) {
      return res.status(HttpStatusCode.NOT_FOUND).send();
    }

    const sale = await this.saleService.createSale(data, req.userId, stockItem.quantity);
    if (!sale) return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send();

    return res.status(HttpStatusCode.CREATED).send()
  }

  async getSellerCommision(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { startOf, endOf } = req.query;

    if (req.userId !== Number(id)) return res.status(HttpStatusCode.FORBIDDEN).send();

    const data = await this.saleService.getCommision(req.userId, startOf as string | undefined, endOf as string | undefined);
    if (typeof data === null) return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send();

    return res.status(HttpStatusCode.OK).json({ commission_amount: data });
  }

  async getAllCommisions(req: Request, res: Response): Promise<Response> {
    const { startOf, endOf, order } = req.query;

    const data = await this.saleService.findAllCommisions(startOf as string | undefined, endOf as string | undefined, order as "asc" | "desc" | undefined);
    if (typeof data === null) return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send();

    return res.status(HttpStatusCode.OK).json({ commission_amount: data });
  }

}
