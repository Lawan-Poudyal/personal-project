import { formatMoney } from "../scripts/utilities/money.js";

describe("test Suite: format money", () => {
  it("converts cents into dollars", () => {
    expect(formatMoney(1099)).toEqual("10.99");
  });

  it("works with 0", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });
});
