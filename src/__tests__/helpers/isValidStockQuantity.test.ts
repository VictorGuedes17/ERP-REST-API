import { isValidStockQuantity } from "../../helpers/isValidStockQuantity";
import { mockStock } from "../mocks/stock";

describe('#isValidQuantity helper', () => {
  it('should returns false when stockItem to equal null', () => {
    const helper = isValidStockQuantity(null, 1);
    expect(helper).toBeFalsy();
  });

  it('should return false when item quantity to equal 0', () => {
    mockStock.quantity = 0;
    const helper = isValidStockQuantity(mockStock, 2);
    expect(helper).toBeFalsy();
  });

  it('should return false when not having item stock', () => {
    const helper = isValidStockQuantity(mockStock, 11);
    expect(helper).toBeFalsy();
  });

  it('should return true when have item stock', () => {
    mockStock.quantity = 10;
    const helper = isValidStockQuantity(mockStock, 2);
    expect(helper).toBeTruthy();
  });
});
