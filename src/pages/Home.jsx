import { Link } from "react-router-dom";
import { getProduct, productsInCategory } from "../data";
import { explainQuote, inr } from "../pricing";
import { useShop } from "../shop";
import { PricePanels, ProductTile, SectionLabel } from "../components/Commerce";
import { Page } from "../components/Chrome";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Say what you need in a normal sentence. Budget, brand, and how you will use it are enough.",
  },
  {
    n: "02",
    title: "Compare",
    body: "AfterCart lines up the same variant across retailers, matched on model, colour and condition.",
  },
  {
    n: "03",
    title: "Optimize",
    body: "Coupons, caps, delivery and the offer your card can actually use. Cashback stays separate from payable now.",
  },
  {
    n: "04",
    title: "Resolve",
    body: "Track the order, read the return window, and prepare the request. You approve anything that gets submitted.",
  },
];

function HeroThread() {
  const { card } = useShop();
  const product = getProduct("sony-whch720");
  const { ranked } = explainQuote(product, card);
  const best = ranked[0];
  const under = best.quote.payable <= 8000;

  return (
    <div className="agent-surface border border-line p-4 sm:p-6">
      <p className="text-[22px] font-semibold leading-tight tracking-[-0.03em] sm:text-[26px]">
        Priced for your card.
      </p>
      <div className="mt-6 space-y-3">
        <div className="ml-auto max-w-[92%] bg-ink px-4 py-3 text-[14px] leading-relaxed text-white">
          Over-ear headphones under ₹8,000. I have an {card.name}.
        </div>
        <div className="max-w-[95%] border border-line bg-white px-4 py-3 text-[14px] leading-relaxed text-ink">
          The Sony WH-CH720N in black fits that ask. Same variant on Amazon and Flipkart.
          {under
            ? ` Payable now on the better store is ${inr(best.quote.payable)}, inside the budget.`
            : ` With this card it comes to ${inr(best.quote.payable)}, just over ₹8,000. I would rather show you that than force a match.`}
        </div>
        <div className="border border-line bg-white p-4">
          <div className="flex gap-3">
            <img src={product.image} alt="" className="h-16 w-16 object-cover" />
            <div>
              <p className="text-[14px] font-semibold">{product.name}</p>
              <p className="mt-0.5 text-[12px] text-mute">{product.variant}</p>
              <p className="mt-1 text-[12px] text-mute">{product.match}</p>
            </div>
          </div>
          <div className="mt-4">
            <PricePanels product={product} compact />
          </div>
          <Link to={`/product/${product.id}`} className="mt-4 inline-flex text-[13px] font-semibold text-ink underline decoration-[#cccccc] underline-offset-4 hover:decoration-ink">
            Open the full comparison
          </Link>
        </div>
      </div>
      <p className="mt-4 text-[12px] text-mute">Illustrative offers · not live bank terms.</p>
    </div>
  );
}

export default function Home() {
  const audio = productsInCategory("audio");
  const desk = productsInCategory("computing");
  const rest = [...productsInCategory("travel"), ...productsInCategory("care")];

  return (
    <Page>
      <section className="mx-auto grid max-w-[1120px] items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <div>
          <SectionLabel>Personal shopping agent</SectionLabel>
          <h1 className="mt-4 max-w-[520px] text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[52px]">
            What you pay should be the real price.
          </h1>
          <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-[#444]">
            AfterCart finds the product, compares the same variant across stores, and works out what your card actually makes payable. Then it stays on for tracking and returns.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/ask" className="inline-flex h-12 items-center bg-ink px-5 text-[14px] font-semibold text-white transition hover:bg-[#2a2a2a]">
              Ask AfterCart
              <span className="ml-3 text-leaf">→</span>
            </Link>
            <Link to="/product/sony-whch720" className="text-[14px] font-medium text-ink underline decoration-[#cccccc] underline-offset-4 hover:decoration-ink">
              See a worked price
            </Link>
          </div>
        </div>
        <HeroThread />
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
          <h2 className="text-[28px] font-semibold tracking-[-0.03em]">Four parts of one purchase</h2>
          <div className="mt-8 grid border-t border-line md:grid-cols-4">
            {steps.map((step) => (
              <article key={step.n} className="border-b border-line py-6 md:border-b-0 md:border-r md:px-5 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="text-[13px] font-medium text-leaf">{step.n}</p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mute">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] text-mute">Browse the catalog</p>
            <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.03em]">Explore the shortlist</h2>
          </div>
          <Link to="/categories" className="inline-flex h-11 items-center border border-ink px-4 text-[13px] font-semibold tracking-[0.01em] hover:bg-ink hover:text-white">
            Browse all categories
            <span className="ml-3">→</span>
          </Link>
        </div>

        <CatalogRow title="Audio" to="/category/audio" products={audio} />
        <CatalogRow title="Laptops & desk" to="/category/computing" products={desk} />
        <CatalogRow title="Bags & care" to="/categories" products={rest} />
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel>After checkout</SectionLabel>
            <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-[-0.03em]">
              It does not stop at the cart.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#444]">
              The same agent can find a shipment and read a return window. A return is prepared here, and it is sent only after you approve the request.
            </p>
            <Link to="/orders" className="mt-6 inline-flex text-[14px] font-semibold underline decoration-[#cccccc] underline-offset-4 hover:decoration-ink">
              Open your orders
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="border border-line bg-white p-5">
              <p className="text-[12px] text-mute">AC-44190 · Amazon.in</p>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug">Re'equil Oil Control Gel SPF 50</h3>
              <p className="mt-1 text-[13px] text-mute">50 g · Paid ₹310</p>
              <p className="mt-4 text-[14px] font-medium text-leaf">Shipped</p>
              <p className="mt-1 text-[14px] leading-relaxed">Arriving Tuesday in Indiranagar, Bengaluru.</p>
              <Link to="/orders/ord_reequil" className="mt-4 inline-block text-[13px] font-semibold underline decoration-[#cccccc] underline-offset-4">
                Track order
              </Link>
            </article>
            <article className="border border-line bg-white p-5">
              <p className="text-[12px] text-mute">AC-18812 · Myntra</p>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug">Mokobara Laptop Backpack</h3>
              <p className="mt-1 text-[13px] text-mute">Delivered 24 Nov · Paid ₹3,240</p>
              <p className="mt-4 text-[14px] font-medium text-leaf">Return eligible · 5 days left</p>
              <p className="mt-1 text-[14px] leading-relaxed">Unused, tags on. Refund to the original payment method.</p>
              <Link to="/orders/ord_moko" className="mt-4 inline-block text-[13px] font-semibold underline decoration-[#cccccc] underline-offset-4">
                Prepare return
              </Link>
            </article>
          </div>
        </div>
      </section>
    </Page>
  );
}

function CatalogRow({ title, to, products }) {
  return (
    <div className="mt-12">
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-[18px] font-semibold">{title}</h3>
        <Link to={to} className="text-[13px] text-mute hover:text-ink">
          View
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
