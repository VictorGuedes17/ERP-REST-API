import express, { Request, Response } from 'express';
import routePermissionMiddleware from '../middlewares/routePermission';

import SalesController from "../controllers/sales";

export default class SalesRoutes {

  public salesController: SalesController = new SalesController();

  public router: express.Router = express.Router();

  public routes(app: any): any {
    this.router.post('/', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.salesController.create(req, res));
    this.router.get('/comission/:id', (req, res, next) => routePermissionMiddleware(req, res, next), (req: Request, res: Response) => this.salesController.getSellerCommision(req, res));

    app.use('/sales', this.router);
  }
}
