import express from "express";
import AuthRoutes from "./routes/auth";
import SalesRoutes from "./routes/sales";
import StockRoutes from "./routes/stock";

export class Routes {

  public authRoutes: AuthRoutes = new AuthRoutes();
  public stockRoutes: StockRoutes = new StockRoutes();
  public salesRoutes: SalesRoutes = new SalesRoutes();

  constructor(app: express.Application) {
    this.routerSetup(app);
  }

  public routerSetup(app: any): void {
    this.authRoutes.routes(app);
    this.stockRoutes.routes(app);
    this.salesRoutes.routes(app);
  }

}
