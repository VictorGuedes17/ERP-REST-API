import { Sales, Stock } from "@prisma/client";

export interface ISalesStock extends Sales {
  stock: Stock
}
