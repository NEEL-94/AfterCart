import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../data";
import { inr, retailers } from "../pricing";
import { useShop } from "../shop";
import { Page } from "../components/Chrome";

function StatusLine({ order }) {
  if (order.status === "return_requested") return `Return requested · pickup ${order.pickup}`;
  if (order.status === "delivered") return `Delivered · return eligible${order.daysLeft ? ` · ${order.daysLeft} days left` : ""}`;
  return `Shipped · arriving ${order.eta}`;
}

export function OrdersPage() {
  const { orders } = useShop();
  return (
    <Page>
      <div className="mx-auto max-w-[860px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">After checkout</p>
        <h1 className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">Orders</h1>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-mute">
          Two orders in this demo. One is still moving. One can be returned, if you approve the request.
        </p>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {orders.map((order) => {
            const product = getProduct(order.productId);
            return (
              <Link key={order.id} to={`/orders/${order.id}`} className="flex gap-4 py-5 hover:bg-paper">
                <img src={product.image} alt="" className="h-20 w-20 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-mute">{order.reference} · {retailers[order.retailer]}</p>
                  <h2 className="mt-1 text-[16px] font-semibold">{product.name}</h2>
                  <p className="mt-1 text-[14px] text-leaf">{StatusLine({ order })}</p>
                </div>
                <p className="text-[14px] font-medium">{inr(order.paid)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

export function OrderPage() {
  const { id } = useParams();
  const { orders, prepareReturn } = useShop();
  const order = orders.find((o) => o.id === id);
  const [reason, setReason] = useState("Changed my mind");
  const [note, setNote] = useState("");

  if (!order) {
    return (
      <Page>
        <div className="mx-auto max-w-[860px] px-5 py-20">
          <h1 className="text-[32px] font-semibold">Order not found.</h1>
          <Link to="/orders" className="mt-4 inline-block underline">All orders</Link>
        </div>
      </Page>
    );
  }

  const product = getProduct(order.productId);
  const canReturn = order.status === "delivered";

  return (
    <Page>
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 py-12 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Link to="/orders" className="text-[13px] text-mute hover:text-ink">Orders</Link>
          <p className="mt-4 text-[13px] text-mute">{order.reference} · {retailers[order.retailer]}</p>
          <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.04em]">{product.name}</h1>
          <img src={product.image} alt={product.name} className="mt-6 aspect-square w-full max-w-sm object-cover" />
        </div>
        <div className="lg:pt-10">
          <p className="text-[14px] font-semibold text-leaf">{StatusLine({ order })}</p>
          <p className="mt-3 text-[15px] leading-relaxed">{order.detail}</p>
          <dl className="mt-6 space-y-2 text-[14px]">
            <div className="flex justify-between gap-6 border-t border-line py-2">
              <dt className="text-mute">Paid</dt>
              <dd>{inr(order.paid)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-line py-2">
              <dt className="text-mute">Where</dt>
              <dd className="text-right">{order.place}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-b border-line py-2">
              <dt className="text-mute">Policy</dt>
              <dd className="max-w-xs text-right">{order.policy}</dd>
            </div>
          </dl>

          {order.status === "shipped" && (
            <p className="mt-6 text-[14px] leading-relaxed text-mute">
              The return window opens after delivery. AfterCart will not start a return on an order that is still in transit.
            </p>
          )}

          {order.status === "return_requested" && (
            <div className="mt-6 border border-leaf bg-mist px-5 py-4">
              <p className="text-[14px] font-semibold">You approved this return.</p>
              <p className="mt-2 text-[14px] leading-relaxed">
                Reason: {order.reason}. Pickup {order.pickup}. Refund to the original payment method once {retailers[order.retailer]} accepts the request.
                {order.note ? ` Note: ${order.note}` : ""}
              </p>
            </div>
          )}

          {canReturn && (
            <form
              className="mt-8 border border-line p-5"
              onSubmit={(e) => {
                e.preventDefault();
                prepareReturn(order.id, reason, note.trim());
              }}
            >
              <h2 className="text-[18px] font-semibold">Prepare return</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-mute">
                This fills the request. It is not sent until you approve it.
              </p>
              <label className="mt-5 block text-[13px] font-medium">
                Reason
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-2 h-11 w-full border border-line bg-white px-3 text-[14px] outline-none focus:border-ink"
                >
                  <option>Changed my mind</option>
                  <option>Doesn't fit the laptop</option>
                  <option>Arrived damaged</option>
                </select>
              </label>
              <label className="mt-4 block text-[13px] font-medium">
                Note for the retailer
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Optional"
                  className="mt-2 w-full border border-line px-3 py-2 text-[14px] outline-none focus:border-ink"
                />
              </label>
              <p className="mt-4 text-[13px] leading-relaxed text-mute">
                Refund method: original payment. Eligibility: unused, tags on, {order.daysLeft} days left in a 7-day window.
              </p>
              <button type="submit" className="mt-5 h-12 bg-ink px-5 text-[14px] font-semibold text-white hover:bg-[#2a2a2a]">
                Approve and submit return
              </button>
            </form>
          )}
        </div>
      </div>
    </Page>
  );
}
