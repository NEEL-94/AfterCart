import { getProduct, products } from "./data";
import { explainQuote, inr, retailers } from "./pricing";

function findProduct(query) {
  const q = query.toLowerCase();
  const hints = [
    ["sony-whch720", ["headphone", "sony", "wh-ch", "over-ear", "over ear", "720"]],
    ["cmf-buds", ["cmf", "buds", "earbud", "nothing"]],
    ["boat-rockerz", ["boat", "rockerz", "airdopes"]],
    ["jbl-flip6", ["jbl", "flip", "speaker"]],
    ["ideapad-slim5", ["ideapad", "lenovo", "laptop"]],
    ["mba-13", ["macbook", "apple", "air"]],
    ["mx-master", ["mouse", "mx master", "master 3"]],
    ["mx-keys", ["keyboard", "mx keys"]],
    ["mokobara-backpack", ["mokobara", "backpack", "bag"]],
    ["wildcraft-duffel", ["wildcraft", "duffel"]],
    ["reequil-gel", ["sunscreen", "reequil", "spf", "gel"]],
    ["minimalist-serum", ["serum", "minimalist", "vitamin"]],
  ];
  for (const [id, words] of hints) {
    if (words.some((word) => q.includes(word))) return getProduct(id);
  }
  return null;
}

export function answerQuestion(text, card, orders) {
  const q = text.toLowerCase();
  const wantsReturn = /return|refund|exchange/.test(q);
  const wantsOrder = /order|track|where|status|delivery|shipped|arriving/.test(q);

  if (wantsReturn || (wantsOrder && /backpack|mokobara|bag/.test(q))) {
    const order = orders.find((o) => o.id === "ord_moko");
    if (order.status === "return_requested") {
      return {
        text: `The Mokobara return is already requested. Pickup is ${order.pickup}. The refund goes back to the original payment method once Myntra accepts it.`,
        result: { type: "return", orderId: order.id },
      };
    }
    return {
      text: "The Mokobara backpack was delivered on 24 Nov. The 7-day window is still open, with 5 days left, as long as it is unused and the tags are on. I can prepare the return. Nothing is submitted until you approve it.",
      result: { type: "return", orderId: order.id },
    };
  }

  if (wantsOrder || /sunscreen|reequil/.test(q)) {
    const order = orders.find((o) => o.id === "ord_reequil");
    return {
      text: `Your Re'equil sunscreen is shipped. It is due ${order.eta} in ${order.place}. You paid ${inr(order.paid)} on Amazon. Returns open only after it is delivered.`,
      result: { type: "order", orderId: order.id },
    };
  }

  const budgetMatch = q.match(/under\s*₹?\s*([\d,]+)/);
  const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;

  let product = findProduct(q);
  if (!product && /headphone|audio|listen/.test(q)) product = getProduct("sony-whch720");
  if (!product && /compare|cheaper|price|pay|offer|card/.test(q)) product = getProduct("sony-whch720");

  if (product) {
    const { ranked, lead, second } = explainQuote(product, card);
    const payable = ranked[0].quote.payable;
    let budgetLine = "";
    if (budget) {
      budgetLine =
        payable <= budget
          ? ` Payable now is ${inr(payable)}, inside your ${inr(budget)} budget.`
          : ` Payable now is ${inr(payable)}, which is over a ${inr(budget)} budget. I would not stretch the listing to make it fit.`;
    }
    const names = product.listings.map((l) => retailers[l.retailer]).join(" and ");
    return {
      text: `${product.name}, ${product.variant.split("·")[0].trim().toLowerCase()}. I matched the same variant on ${names}. ${lead} ${second}${budgetLine}`,
      result: { type: "compare", productId: product.id },
    };
  }

  if (/what can you|help|hello|hi\b/.test(q)) {
    return {
      text: "I can compare a product across the stores in this catalog, price it for your card, or check an order. Try the headphones, the MacBook, or the sunscreen that is already on the way.",
      result: null,
    };
  }

  const names = products
    .slice(0, 4)
    .map((p) => p.name)
    .join(", ");
  return {
    text: `I could not match that in the demo catalog. I can price ${names}, and I can check the sunscreen shipment or the backpack return.`,
    result: null,
  };
}
