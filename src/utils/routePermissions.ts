import { UserRole } from "@prisma/client";

export const ROUTE_PERMISSION: { [route: string]: UserRole[] } = {
  'GET/stock/:id': ["SELLER"],
  'POST/stock/': ["SELLER"],
  'POST/stock/itens': ["SELLER"],
  'PUT/stock/:stockId': ["SELLER"],

  'POST/sales/': ["SELLER"],
  'GET/sales/comission/:id': ["SELLER"],
}
