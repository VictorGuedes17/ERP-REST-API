import express, { Request, Response } from 'express';

import StockController from "../controllers/stock";
import routePermissionMiddleware from '../middlewares/routePermission';

export default class StockRoutes {

  public stockController: StockController = new StockController();

  public router: express.Router = express.Router();

  public routes(app: any): any {
    this.router.get('/:id', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.stockController.findById(req, res));
    this.router.post('/', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.stockController.create(req, res));
    this.router.post('/itens', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.stockController.findMany(req, res));
    this.router.put('/:stockId', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.stockController.updateById(req, res));

    app.use('/stock', this.router);
  }
}
