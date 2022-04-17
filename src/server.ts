import express, { RequestHandler } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import { Routes } from './Routes';
import jwtAuthHook from './hooks/jwtAuthHook';
import { swaggerOptions } from './config/swagger';


class Api {
  public app: express.Application;
  public routes: Routes;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.app.use(jwtAuthHook as RequestHandler)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    this.routes = new Routes(this.app);
    this.app.listen(process.env.PORT || 3003, () => console.log("executando na porta: ",process.env.PORT || 3003));
  };

  private config(): void {
    this.app.use(cors());
    dotenv.config();
  }
}

module.exports = new Api().app;
