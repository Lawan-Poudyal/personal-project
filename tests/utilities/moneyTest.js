import { formatMoney } from "../scripts/utilities/money.js";

describe("test Suite: format money", () => {
  it("converts cents into dollars", () => {
    expect(formatMoney(1099)).toEqual("10.99");
  });

  it("works with 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });
  it("rounds to nthe earest cent", () => {
    expect(formatMoney(2000.5)).toEqual("20.01");
  });
});
