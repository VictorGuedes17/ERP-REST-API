import express, { Request, Response } from 'express';

import AuthController from "../controllers/auth";


export default class AuthRoutes {

  public authController: AuthController = new AuthController();

  public router: express.Router = express.Router();

  public routes(app: express.Application): any {
    this.router.post('/', (req: Request, res: Response) => this.authController.login(req, res));

    app.use('/auth', this.router);
  }
}
