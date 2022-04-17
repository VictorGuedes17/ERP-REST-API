import { Request, Response } from 'express';
import StockService from '../services/stock';
import HttpStatusCode from '../typings/enums/HttpStatusCodeEnum';

export default class StockController {
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const stock = await this.stockService.findByStockId(Number(id));
    if (!stock) return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send();

    return res.status(HttpStatusCode.OK).json({ data: stock })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const stock = await this.stockService.create(data, req.userId);
    if (!stock) return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send();

    return res.status(HttpStatusCode.CREATED).send();
  }

  async findMany(req: Request, res: Response): Promise<Response> {
    const { page, filters } = req.body;

    const data = await this.stockService.findAllItens(page, filters);
    if (!data) return res.status(422).send(HttpStatusCode.UNPROCESSABLE_ENTITY);

    return res.status(200).json({ data });
  }

  async updateById(req: Request, res: Response): Promise<Response> {
    const { stockId } = req.params;
    const changes = req.body;

    const data = this.stockService.changeStock(Number(stockId), changes);
    if (!data) return res.status(422).send(HttpStatusCode.UNPROCESSABLE_ENTITY);

    return res.status(200).json({ data });
  }
}
