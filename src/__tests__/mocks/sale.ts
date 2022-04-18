import { Sales } from "@prisma/client";
import { ISalesStock } from "../../interfaces/ISalesStock";

//@ts-ignore
export const mockSaleOmited = {
  discount: 0,
  sold_amount: 3,
  stock_id: 1,
} as Omit<Sales, "id" | "saleman" | "created_at" | "updated_at">

//@ts-ignore
export const mockSale = {
  id: 1,
  discount: 0,
  sold_amount: 3,
  stock_id: 1,
  updated_at: new Date(),
  created_at: new Date()
} as Sales;


//@ts-ignore
export const mockSaleStock = {
  id: 1,
  discount: 0,
  sold_amount: 3,
  stock_id: 1,
  updated_at: new Date(),
  created_at: new Date(),
  stock: {
    commission: 10,
    price: 5
  }
} as ISalesStock;
