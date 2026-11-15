/* Pink Tax data: product pairs and category premiums.
 *
 * Sources and honesty notes:
 * - Category premium percentages come from the NYC Department of Consumer
 *   Affairs study "From Cradle to Cane: The Cost of Being a Female Consumer"
 *   (2015), which compared 794 gendered products across 24 NYC retailers and
 *   found women's versions cost more 42% of the time (vs 18% for men's).
 * - The specific prices below are ILLUSTRATIVE example pairs chosen to sit
 *   near those category averages; they are not quotes from specific stores.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PINK_TAX_DATA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return {
    sourceNote:
      "Category premiums: NYC DCA, From Cradle to Cane (2015), 794 products. " +
      "Prices: illustrative example pairs near those averages.",
    categories: [
      {
        id: "personal-care",
        label: "personal care",
        dcaPremiumPct: 13,
        items: [
          { name: "razor cartridges (4-pack)", mens: 7.99, womens: 8.99 },
          { name: "deodorant (same brand, 2.6 oz)", mens: 4.29, womens: 4.79 },
          { name: "shampoo (12 oz)", mens: 5.49, womens: 6.29 },
          { name: "body lotion (10 oz)", mens: 6.99, womens: 7.99 },
          { name: "face moisturizer", mens: 9.99, womens: 11.49 },
        ],
      },
      {
        id: "clothing",
        label: "adult clothing",
        dcaPremiumPct: 8,
        items: [
          { name: "straight-leg jeans", mens: 39.99, womens: 44.99 },
          { name: "plain white t-shirt", mens: 9.99, womens: 10.99 },
          { name: "button-down oxford shirt", mens: 29.99, womens: 32.49 },
          { name: "hoodie (same brand)", mens: 34.99, womens: 37.99 },
        ],
      },
      {
        id: "kids-toys",
        label: "kids' toys & gear",
        dcaPremiumPct: 7,
        items: [
          { name: "kick scooter", mens: 24.99, womens: 26.99 },
          { name: "bike helmet", mens: 19.99, womens: 21.49 },
          { name: "backpack", mens: 22.99, womens: 24.99 },
        ],
      },
      {
        id: "kids-clothing",
        label: "kids' clothing",
        dcaPremiumPct: 4,
        items: [
          { name: "toddler jeans", mens: 14.99, womens: 15.49 },
          { name: "kids' sneakers", mens: 24.99, womens: 25.99 },
        ],
      },
      {
        id: "senior-care",
        label: "senior & home health",
        dcaPremiumPct: 8,
        items: [
          { name: "support cane", mens: 19.99, womens: 21.49 },
          { name: "compression socks", mens: 12.99, womens: 13.99 },
        ],
      },
    ],
  };
});
