import { Link } from "react-router-dom";
import { cards } from "../data";
import { explainQuote, inr, retailers } from "../pricing";
import { useShop } from "../shop";

export function ProductTile({ product }) {
  const { card } = useShop();
  const { ranked } = explainQuote(product, card);
  const best = ranked[0];

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-square overflow-hidden bg-[#EFECE6]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-[13.5px] font-medium leading-snug text-ink">{product.name}</p>
      <p className="mt-1 text-[12.5px] text-mute">
        {product.listings.length} stores · from {inr(best.quote.payable)} payable
      </p>
    </Link>
  );
}

function Row({ label, value, strong, green }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-1.5 text-[13.5px] ${strong ? "font-semibold" : ""}`}>
      <span className={strong ? "text-ink" : "text-mute"}>{label}</span>
      <span className={green ? "text-leaf" : "text-ink"}>{value}</span>
    </div>
  );
}

export function PricePanels({ product, compact = false }) {
  const { card } = useShop();
  const { ranked, lead, second } = explainQuote(product, card);
  const winner = ranked[0].listing.retailer;

  return (
    <div>
      <div className={`grid gap-4 ${ranked.length > 1 ? "md:grid-cols-2" : ""}`}>
        {ranked
          .slice()
          .sort((a, b) => a.listing.retailer.localeCompare(b.listing.retailer))
          .map(({ listing, quote }) => {
            const wins = listing.retailer === winner;
            const offer =
              quote.instant > 0
                ? `− ${inr(quote.instant)}`
                : quote.cashback > 0
                  ? "Cashback, not instant"
                  : "Not on this card";
            return (
              <article
                key={listing.retailer}
                className={`border bg-white px-4 py-4 ${wins ? "border-leaf" : "border-line"} ${compact ? "" : "sm:px-5"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-semibold tracking-[-0.01em]">{retailers[listing.retailer]}</p>
                    <p className="mt-0.5 text-[12px] text-mute">{listing.seller}</p>
                  </div>
                  {wins && <p className="text-[12px] font-semibold text-leaf">Lowest payable</p>}
                </div>
                <div className="mt-3 border-t border-line">
                  <Row label="Listed" value={inr(listing.price)} />
                  {listing.coupon > 0 && <Row label="Coupon" value={`− ${inr(listing.coupon)}`} />}
                  <Row label={`${card.bank} offer`} value={offer} />
                  <Row label="Delivery" value={quote.delivery ? inr(quote.delivery) : "Free"} />
                  <div className="mt-1 border-t border-line">
                    <Row label="Payable now" value={inr(quote.payable)} strong green={wins} />
                    <Row label="Cashback later" value={quote.cashback ? inr(quote.cashback) : "—"} />
                  </div>
                </div>
              </article>
            );
          })}
      </div>
      {!compact && (
        <div className="mt-4 max-w-2xl">
          <p className="text-[14px] leading-relaxed text-ink">{lead}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-mute">{second}</p>
        </div>
      )}
    </div>
  );
}

export function CardSwitch({ compact = false }) {
  const { cardId, setCardId } = useShop();
  return (
    <div>
      <div className={`flex flex-wrap gap-2 ${compact ? "" : ""}`} role="radiogroup" aria-label="Payment card">
        {cards.map((card) => {
          const on = card.id === cardId;
          return (
            <button
              key={card.id}
              role="radio"
              aria-checked={on}
              onClick={() => setCardId(card.id)}
              className={`border px-3 py-2 text-left text-[13px] transition ${
                on ? "border-leaf bg-mist text-ink" : "border-line bg-white text-ink hover:border-[#cccccc]"
              }`}
            >
              <span className="block font-semibold">{card.name}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-mute">
        {cards.find((c) => c.id === cardId)?.detail} Sample rules only. No card number is stored.
      </p>
    </div>
  );
}

export function SectionLabel({ children }) {
  return <p className="text-[13px] font-medium text-leaf">{children}</p>;
}
