import express from "express";
import AuthRoutes from "./routes/auth";

export class Routes {

  public authRoutes: AuthRoutes = new AuthRoutes();

  constructor(app: express.Application) {
    this.routerSetup(app);
  }

  public routerSetup(app: any): void {
    this.authRoutes.routes(app);
  }

}