import { Stock } from "@prisma/client";

export const isValidStockQuantity = (stockItem: Stock | null, soldAmount: number): boolean => {
  if (!stockItem) return false;
  if (stockItem.quantity === 0) return false;
  if (stockItem.quantity - soldAmount < 0) return false;
  return true;
}
