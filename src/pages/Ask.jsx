import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { answerQuestion } from "../agent";
import { getProduct } from "../data";
import { useShop } from "../shop";
import { Page } from "../components/Chrome";
import { CardSwitch, PricePanels } from "../components/Commerce";

const suggestions = [
  "Over-ear headphones under ₹8,000",
  "Is the MacBook actually cheaper on Amazon?",
  "Where is my sunscreen?",
  "Can I return the backpack?",
];

function ResultBody({ result, orders }) {
  if (!result) {
    return (
      <div className="border border-dashed border-line px-5 py-10">
        <p className="text-[15px] font-medium">A result will land here.</p>
        <p className="mt-2 text-[14px] leading-relaxed text-mute">
          A comparison, a payable price, or an order. The conversation stays on the left. The thing you can act on stays on the right.
        </p>
      </div>
    );
  }
  if (result.type === "compare") {
    const product = getProduct(result.productId);
    return (
      <div>
        <p className="text-[12px] font-medium text-mute">Comparison</p>
        <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{product.name}</h2>
        <p className="mt-1 text-[13px] text-mute">{product.match}</p>
        <div className="mt-4">
          <PricePanels product={product} compact />
        </div>
        <Link to={`/product/${product.id}`} className="mt-4 inline-block text-[13px] font-semibold underline decoration-[#cccccc] underline-offset-4">
          Open product
        </Link>
      </div>
    );
  }
  const order = orders.find((o) => o.id === result.orderId);
  const product = getProduct(order.productId);
  return (
    <div className="border border-line bg-white p-5">
      <p className="text-[12px] text-mute">{order.reference}</p>
      <h2 className="mt-2 text-[18px] font-semibold">{product.name}</h2>
      <p className="mt-3 text-[14px] leading-relaxed">{order.detail}</p>
      <p className="mt-3 text-[14px] font-medium text-leaf">
        {order.status === "return_requested" ? `Return requested · ${order.pickup}` : order.status === "delivered" ? "Delivered" : "Shipped"}
      </p>
      <Link to={`/orders/${order.id}`} className="mt-4 inline-block text-[13px] font-semibold underline decoration-[#cccccc] underline-offset-4">
        {order.status === "delivered" ? "Prepare the return" : "View order"}
      </Link>
    </div>
  );
}

export default function AskPage() {
  const { card, orders } = useShop();
  const [params] = useSearchParams();
  const seeded = useRef(false);
  const [messages, setMessages] = useState([
    {
      role: "agent",
      text: "What are you looking for? I can compare something in the catalog, price it for your card, or check an order.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState(null);
  const scroller = useRef(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages, thinking]);

  function ask(text) {
    const clean = text.trim();
    if (!clean || thinking) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setDraft("");
    setThinking(true);
    window.setTimeout(() => {
      const reply = answerQuestion(clean, card, orders);
      setMessages((m) => [...m, { role: "agent", text: reply.text }]);
      if (reply.result) setResult(reply.result);
      setThinking(false);
    }, 650);
  }

  useEffect(() => {
    const q = params.get("q");
    if (q && !seeded.current) {
      seeded.current = true;
      ask(q);
    }
    // The first query from search should send once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Page>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1200px] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex min-h-[70vh] flex-col border-line lg:border-r">
          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-8 md:px-8">
            <p className="text-[12px] font-medium tracking-[0.04em] text-leaf">AGENT LIVE</p>
            <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Ask AfterCart</h1>
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "ml-auto max-w-[85%] bg-ink px-4 py-3 text-[14px] leading-relaxed text-white" : "max-w-[90%] border border-line bg-white px-4 py-3 text-[14px] leading-relaxed"}>
                {message.text}
              </div>
            ))}
            {thinking && (
              <div className="inline-flex items-center gap-2 border border-line px-4 py-3 text-[14px] text-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                Checking the catalog
              </div>
            )}
          </div>
          <div className="border-t border-line px-5 py-4 md:px-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button key={item} onClick={() => ask(item)} className="border border-line px-3 py-1.5 text-left text-[12.5px] text-ink hover:border-ink">
                  {item}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
              className="flex gap-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="A product, a price, or an order"
                className="h-12 flex-1 border border-line px-4 text-[14px] outline-none focus:border-ink"
              />
              <button type="submit" className="h-12 bg-ink px-5 text-[14px] font-semibold text-white">
                Send
              </button>
            </form>
          </div>
        </section>
        <aside className="bg-paper px-5 py-8 md:px-8">
          <p className="text-[12px] font-medium text-mute">Current result</p>
          <div className="mt-4">
            <p className="mb-2 text-[13px] font-medium">Priced for</p>
            <CardSwitch compact />
          </div>
          <div className="mt-6">
            <ResultBody result={result} orders={orders} />
          </div>
        </aside>
      </div>
    </Page>
  );
}
