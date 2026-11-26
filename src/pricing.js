export function inr(n) {
  const value = Math.round(Number(n) || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const retailers = {
  amazon: "Amazon.in",
  flipkart: "Flipkart",
  myntra: "Myntra",
  nykaa: "Nykaa",
};

export function quoteListing(listing, card) {
  const coupon = listing.coupon || 0;
  const delivery = listing.delivery || 0;
  const afterCoupon = listing.price - coupon;
  const rule = card.rules.find((r) => r.retailer === listing.retailer);

  let instant = 0;
  let cashback = 0;
  let rawOffer = 0;
  let capped = false;

  if (rule) {
    rawOffer = rule.flat ? rule.flat : (afterCoupon * rule.percent) / 100;
    const applied = Math.min(rawOffer, rule.cap);
    capped = rawOffer > rule.cap + 0.5;
    if (rule.kind === "instant") instant = applied;
    if (rule.kind === "cashback") cashback = applied;
  }

  const payable = afterCoupon - instant + delivery;

  return {
    coupon,
    delivery,
    instant,
    cashback,
    payable,
    rawOffer,
    capped,
    eligible: Boolean(rule),
    rule,
  };
}

export function rankProduct(product, card) {
  return product.listings
    .map((listing) => ({
      listing,
      quote: quoteListing(listing, card),
    }))
    .sort((a, b) => a.quote.payable - b.quote.payable || a.listing.price - b.listing.price);
}

export function explainQuote(product, card) {
  const ranked = rankProduct(product, card);
  const best = ranked[0];
  const rest = ranked.slice(1);
  const sticker = [...ranked].sort((a, b) => a.listing.price - b.listing.price)[0];
  const bestName = retailers[best.listing.retailer];
  const gap = rest.length ? rest[0].quote.payable - best.quote.payable : 0;

  let lead = `${bestName} is the lowest payable price`;
  if (gap > 0) lead += `, by ${inr(gap)}`;
  lead += ` with your ${card.name}.`;

  const inverted = sticker.listing.retailer !== best.listing.retailer;
  const cappedSide = ranked.find((row) => row.quote.capped && row.quote.rule?.kind === "instant");
  const cashbackSide = [...ranked].sort((a, b) => b.quote.cashback - a.quote.cashback)[0];

  let second = "";
  if (inverted) {
    const stickerName = retailers[sticker.listing.retailer];
    const other = ranked.find((r) => r.listing.retailer !== sticker.listing.retailer);
    const listedGap = Math.abs(other.listing.price - sticker.listing.price);
    second = `${stickerName} lists it ${inr(listedGap)} lower. That is the sticker price, not what leaves your account today.`;
  } else if (cappedSide) {
    const store = retailers[cappedSide.listing.retailer];
    const full = Math.round(cappedSide.quote.rawOffer);
    second = `On ${store}, ${cappedSide.quote.rule.percent}% would have been ${inr(full)} off. The cap holds it at ${inr(cappedSide.quote.rule.cap)}.`;
  } else if (cashbackSide?.quote.cashback > 0 && cashbackSide.listing.retailer !== best.listing.retailer) {
    second = `${retailers[cashbackSide.listing.retailer]} still shows ${inr(cashbackSide.quote.cashback)} cashback later. Cashback is not counted in payable now.`;
  } else if (best.quote.cashback > 0) {
    second = `${inr(best.quote.cashback)} may come back as cashback. It is not part of today’s payable price.`;
  } else if (best.quote.instant > 0) {
    second = `${inr(best.quote.instant)} is already off as an instant offer on ${bestName}.`;
  } else {
    second = "No bank offer on your card applies to the winning listing. Delivery and coupons are still included.";
  }

  return { ranked, lead, second };
}
