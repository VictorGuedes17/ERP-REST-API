import express, { Request, Response } from 'express';

import StockController from "../controllers/stock";

export default class StockRoutes {

  public stockController: StockController = new StockController();

  public router: express.Router = express.Router();

  public routes(app:any) : any {
    this.router.get('/:id', (req: Request, res: Response) => this.stockController.findById(req, res));
    this.router.post('/', (req: Request, res: Response) => this.stockController.create(req, res));
    this.router.post('/itens', (req: Request, res: Response) => this.stockController.findMany(req, res));
    this.router.put('/:stockId', (req: Request, res: Response) => this.stockController.updateById(req, res));

    app.use('/stock', this.router);
  }
}
