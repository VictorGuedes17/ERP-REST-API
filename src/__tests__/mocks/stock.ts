import { Stock } from "@prisma/client";

export const mockStock: Stock = {
  id: 1,
  description: "Violão cg70 yamaha",
  //@ts-ignore
  commission:  10,
  created_by: 4,
  location: "Prateleira 2",
  //@ts-ignore
  price: 1150,
  quantity: 10,
  createdAt: new Date(),
  updatedAt: new Date()
}
