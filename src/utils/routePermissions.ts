import { UserRole } from "@prisma/client";

export const ROUTE_PERMISSION: { [route: string]: UserRole[] } = {
  'GET/stock/:id': ["WAREHOUSE", "SELLER"],
  'POST/stock/': ["WAREHOUSE"],
  'POST/stock/itens': ["WAREHOUSE"],
  'PUT/stock/:stockId': ["WAREHOUSE"],

  'POST/sales/': ["SELLER"],
  'GET/sales/comission/:id': ["SELLER"],
  'GET/sales/comission/': ["FINANCIAL"],
}
