/* Node tests for the pink tax calculation core (tests the data too). */
const assert = require("assert");
const calc = require("../calc.js");
const data = require("../data.js");

function test(name, fn) {
  try {
    fn();
    console.log("ok - " + name);
  } catch (e) {
    console.error("FAIL - " + name + ": " + e.message);
    process.exitCode = 1;
  }
}

test("premiumPct basic", () => {
  assert.strictEqual(calc.premiumPct(10, 11), 10);
  assert.strictEqual(calc.round2(calc.premiumPct(7.99, 8.99)), 12.52);
});

test("premiumPct negative when women's is cheaper", () => {
  assert.strictEqual(calc.premiumPct(10, 9), -10);
});

test("premiumPct rejects zero men's price", () => {
  assert.throws(() => calc.premiumPct(0, 5));
});

test("annualCost and annualGap", () => {
  assert.strictEqual(calc.annualCost(5, 12), 60);
  const item = { mens: 7.99, womens: 8.99 };
  assert.strictEqual(calc.annualGap(item, 12), 12);
});

test("summarizeCart totals and decade gap", () => {
  const cart = [
    { item: { mens: 7.99, womens: 8.99 }, perYear: 12 },
    { item: { mens: 39.99, womens: 44.99 }, perYear: 2 },
  ];
  const s = calc.summarizeCart(cart);
  assert.strictEqual(s.mensTotal, calc.round2(7.99 * 12 + 39.99 * 2));
  assert.strictEqual(s.annualGap, calc.round2(12 + 10));
  assert.strictEqual(s.decadeGap, calc.round2((12 + 10) * 10));
});

test("dataset integrity: categories and prices sane", () => {
  assert.ok(data.categories.length >= 4);
  for (const cat of data.categories) {
    assert.ok(cat.label && cat.dcaPremiumPct > 0);
    assert.ok(cat.items.length >= 2);
    for (const item of cat.items) {
      assert.ok(item.mens > 0 && item.womens > 0, item.name);
      // every example pair should show a pink premium
      assert.ok(item.womens > item.mens, item.name);
    }
  }
});

test("dataset example pairs roughly track the DCA category averages", () => {
  for (const cat of data.categories) {
    const avg =
      cat.items.reduce((sum, i) => sum + calc.premiumPct(i.mens, i.womens), 0) /
      cat.items.length;
    // within 6 points of the study's category average
    assert.ok(
      Math.abs(avg - cat.dcaPremiumPct) <= 6,
      `${cat.id}: avg ${avg.toFixed(1)} vs dca ${cat.dcaPremiumPct}`
    );
  }
});

console.log("done");
