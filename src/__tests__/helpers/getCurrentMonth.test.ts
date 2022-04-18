import { getCurrentMonth } from "../../helpers/getCurrentMonth";

jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7));

describe('#getCurrentMonth helper', () => {
  it('should returns correctly startof and endof date', () => {
    const { startOf, endOf } = getCurrentMonth();
    expect(startOf).toEqual("2020-10-01");
    expect(endOf).toEqual("2020-10-31");
  });
});
