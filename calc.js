/* Pure calculation helpers - shared by the browser app and the node tests. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PinkTaxCalc = factory();
})(typeof self !== "undefined" ? self : this, function () {
  function premiumPct(mens, womens) {
    // % more the women's version costs vs the men's (negative = cheaper)
    if (mens <= 0) throw new Error("men's price must be positive");
    return ((womens - mens) / mens) * 100;
  }

  function annualCost(pricePerUnit, purchasesPerYear) {
    if (pricePerUnit < 0 || purchasesPerYear < 0) {
      throw new Error("price and frequency must be non-negative");
    }
    return pricePerUnit * purchasesPerYear;
  }

  function annualGap(item, purchasesPerYear) {
    // How much more per year the women's version costs for one product.
    return annualCost(item.womens - item.mens, purchasesPerYear);
  }

  function summarizeCart(picks) {
    // picks: [{item, perYear}]
    let mensTotal = 0;
    let womensTotal = 0;
    for (const pick of picks) {
      mensTotal += annualCost(pick.item.mens, pick.perYear);
      womensTotal += annualCost(pick.item.womens, pick.perYear);
    }
    const gap = womensTotal - mensTotal;
    return {
      mensTotal: round2(mensTotal),
      womensTotal: round2(womensTotal),
      annualGap: round2(gap),
      decadeGap: round2(gap * 10),
    };
  }

  function round2(x) {
    return Math.round(x * 100) / 100;
  }

  return { premiumPct, annualCost, annualGap, summarizeCart, round2 };
});
