/* Pink Tax interactive explorer: category tabs, animated paired bars, and a
 * "what does it cost you" annual-gap calculator. */
(function () {
  var data = window.PINK_TAX_DATA;
  var calc = window.PinkTaxCalc;

  var tabsEl = document.getElementById("tabs");
  var chartEl = document.getElementById("chart");
  var summaryEl = document.getElementById("category-summary");
  var calcListEl = document.getElementById("calc-list");
  var calcResultEl = document.getElementById("calc-result");
  document.getElementById("source").textContent = data.sourceNote;

  /* ---------- category chart ---------- */

  function renderTabs() {
    data.categories.forEach(function (cat, i) {
      var btn = document.createElement("button");
      btn.textContent = cat.label;
      btn.addEventListener("click", function () {
        selectCategory(cat.id);
        Array.prototype.forEach.call(tabsEl.children, function (el) {
          el.classList.remove("active");
        });
        btn.classList.add("active");
      });
      if (i === 0) btn.classList.add("active");
      tabsEl.appendChild(btn);
    });
  }

  function selectCategory(id) {
    var cat = data.categories.filter(function (c) { return c.id === id; })[0];
    renderSummary(cat);
    renderChart(cat);
  }

  function renderSummary(cat) {
    var avg = cat.items.reduce(function (sum, i) {
      return sum + calc.premiumPct(i.mens, i.womens);
    }, 0) / cat.items.length;
    summaryEl.innerHTML =
      "in the 2015 nyc study, women's <strong>" + cat.label + "</strong> cost " +
      "<strong>" + cat.dcaPremiumPct + "% more</strong> on average. " +
      "these example pairs average " + avg.toFixed(1) + "% more.";
  }

  function renderChart(cat) {
    chartEl.innerHTML = "";
    var max = Math.max.apply(null, cat.items.map(function (i) {
      return Math.max(i.mens, i.womens);
    }));

    cat.items.forEach(function (item) {
      var wrap = document.createElement("div");
      wrap.className = "pair";

      var name = document.createElement("div");
      name.className = "name";
      name.textContent = item.name;
      wrap.appendChild(name);

      wrap.appendChild(barRow("m", item.mens, max, "men"));
      wrap.appendChild(barRow("w", item.womens, max, "women"));

      var prem = document.createElement("span");
      prem.className = "premium";
      prem.textContent =
        "+" + calc.premiumPct(item.mens, item.womens).toFixed(1) + "% pink tax";
      wrap.appendChild(prem);

      chartEl.appendChild(wrap);
    });

    // animate on next frame so the widths transition in
    requestAnimationFrame(function () {
      Array.prototype.forEach.call(chartEl.querySelectorAll(".bar"), function (bar) {
        bar.style.width = bar.getAttribute("data-w") + "%";
      });
    });
  }

  function barRow(label, price, max, cls) {
    var row = document.createElement("div");
    row.className = "bar-row";

    var lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    row.appendChild(lbl);

    var bar = document.createElement("div");
    bar.className = "bar " + cls;
    bar.setAttribute("data-w", ((price / max) * 78).toFixed(1));
    row.appendChild(bar);

    var priceEl = document.createElement("span");
    priceEl.className = "price";
    priceEl.textContent = "$" + price.toFixed(2);
    row.appendChild(priceEl);

    return row;
  }

  /* ---------- calculator ---------- */

  var FREQUENCIES = [
    { label: "every month", perYear: 12 },
    { label: "every 2 months", perYear: 6 },
    { label: "twice a year", perYear: 2 },
    { label: "once a year", perYear: 1 },
  ];

  function renderCalculator() {
    var all = [];
    data.categories.forEach(function (cat) {
      cat.items.forEach(function (item) { all.push(item); });
    });

    all.forEach(function (item, idx) {
      var row = document.createElement("label");
      row.className = "calc-item";

      var box = document.createElement("input");
      box.type = "checkbox";
      box.setAttribute("data-idx", idx);
      row.appendChild(box);

      var name = document.createElement("span");
      name.className = "item-name";
      name.textContent = item.name;
      row.appendChild(name);

      var sel = document.createElement("select");
      FREQUENCIES.forEach(function (f, fi) {
        var opt = document.createElement("option");
        opt.value = fi;
        opt.textContent = f.label;
        sel.appendChild(opt);
      });
      row.appendChild(sel);

      var gap = document.createElement("span");
      gap.className = "gap";
      row.appendChild(gap);

      function updateGap() {
        var perYear = FREQUENCIES[sel.value].perYear;
        gap.textContent = "+$" + calc.annualGap(item, perYear).toFixed(2) + "/yr";
      }
      sel.addEventListener("change", function () { updateGap(); updateResult(); });
      box.addEventListener("change", updateResult);
      updateGap();

      row._item = item;
      row._sel = sel;
      row._box = box;
      calcListEl.appendChild(row);
    });
  }

  function updateResult() {
    var picks = [];
    Array.prototype.forEach.call(calcListEl.children, function (row) {
      if (row._box.checked) {
        picks.push({
          item: row._item,
          perYear: FREQUENCIES[row._sel.value].perYear,
        });
      }
    });

    if (!picks.length) {
      calcResultEl.classList.remove("show");
      return;
    }
    var s = calc.summarizeCart(picks);
    calcResultEl.innerHTML =
      "your basket costs <span class=\"big\">$" + s.annualGap.toFixed(2) +
      " more per year</span> in the women's versions " +
      "($" + s.womensTotal.toFixed(2) + " vs $" + s.mensTotal.toFixed(2) + "). " +
      "over a decade, that's <strong>$" + s.decadeGap.toFixed(2) +
      "</strong> - for the same stuff, in a different color.";
    calcResultEl.classList.add("show");
  }

  renderTabs();
  selectCategory(data.categories[0].id);
  renderCalculator();
})();
