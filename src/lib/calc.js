export function splitItems(items, people) {
  const result = {};
  people.forEach(p => (result[p.id] = 0));

  items.forEach(item => {
    const assigned =
      item.assignedTo === "all"
        ? people.map(p => p.id)
        : item.assignedTo;

    if (!assigned.length) return;

    const share = item.price / assigned.length;

    assigned.forEach(id => {
      result[id] += share;
    });
  });

  return result;
}

export function applyTax(subtotals, taxRate) {
  const total = Object.values(subtotals).reduce((a, b) => a + b, 0);

  const taxMap = {};
  Object.entries(subtotals).forEach(([id, value]) => {
    taxMap[id] = total ? (value / total) * (total * taxRate) : 0;
  });

  return taxMap;
}

export function applyTip(subtotals, taxMap, tipRate, tipOn) {
  const subtotalSum = Object.values(subtotals).reduce((a, b) => a + b, 0);
  const taxSum = Object.values(taxMap).reduce((a, b) => a + b, 0);

  const base = tipOn === "pre-tax" ? subtotalSum : subtotalSum + taxSum;

  const tipTotal = base * tipRate;

  const tipMap = {};
  Object.entries(subtotals).forEach(([id, value]) => {
    tipMap[id] = base ? (value / base) * tipTotal : 0;
  });

  return tipMap;
}

export function calculateTotals(subtotals, taxMap, tipMap) {
  const result = {};

  Object.keys(subtotals).forEach(id => {
    result[id] = {
      subtotal: subtotals[id],
      tax: taxMap[id],
      tip: tipMap[id],
      total: subtotals[id + ""] + taxMap[id] + tipMap[id]
    };
  });

  return result;
}

export function applyRounding(totals, rule) {
  const rounded = {};
  let diff = 0;

  Object.entries(totals).forEach(([id, val]) => {
    const r = Math.round(val.total);
    rounded[id] = { ...val, total: r };
    diff += val.total - r;
  });

  if (rule === "LAST_PERSON") {
    const last = Object.keys(rounded).slice(-1)[0];
    if (last) rounded[last].total += diff;
  }

  return rounded;
}