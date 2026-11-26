import { cards } from "../data";
import { useShop } from "../shop";
import { Page } from "../components/Chrome";

export function AccountPage() {
  const { cardId, setCardId } = useShop();
  return (
    <Page>
      <div className="mx-auto max-w-[760px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">Maya Krishnan · Bengaluru</p>
        <h1 className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">Payment preference</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#444]">
          AfterCart uses the card you pick to test which offers you are eligible for. Comparisons on the rest of the site follow this choice. A card number is never stored, and payment is never automated.
        </p>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {cards.map((card) => {
            const on = card.id === cardId;
            return (
              <button
                key={card.id}
                onClick={() => setCardId(card.id)}
                className="flex w-full items-start gap-4 py-5 text-left"
              >
                <span className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border ${on ? "border-leaf bg-leaf" : "border-[#cccccc]"}`} />
                <span>
                  <span className="block text-[16px] font-semibold">{card.name}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-mute">{card.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

export function AboutPage() {
  return (
    <Page>
      <div className="mx-auto max-w-[760px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-leaf">wHACKiest 2026 · Track 2</p>
        <h1 className="mt-3 text-[40px] font-semibold leading-tight tracking-[-0.04em]">
          AfterCart is the purchase, handled properly.
        </h1>
        <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-[#333]">
          <p>
            Shopping is split across discovery, comparison, bank offers and whatever happens after you pay. Marketplaces are strong inside their own checkout. Comparison sites mostly stop at the listed price. AfterCart is a prototype of the missing stretch: the same agent, from the ask to the return.
          </p>
          <p>
            Discover is a plain-language request. Compare keeps only equivalent variants. Optimize is deterministic: instant discounts, coupons, delivery and caps change what you pay now, and cashback is shown on its own. Resolve looks up an order, reads the policy, and prepares a return that waits for your approval.
          </p>
          <p>
            This website is the experience demo. The catalog, offer rules and orders are illustrative. It does not connect to live retailers, it does not take payment, and it does not store a card number, CVV or OTP.
          </p>
          <p className="text-mute">
            Ramaiah Institute of Technology. Team ZeroTouch. Neel Upadhyaya, Aman Singh Banafar, Dhruv Sharma.
          </p>
        </div>
      </div>
    </Page>
  );
}
