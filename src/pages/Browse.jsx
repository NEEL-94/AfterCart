import { Link, useParams, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { categories, getCategory, products, productsInCategory } from "../data";
import { explainQuote } from "../pricing";
import { useShop } from "../shop";
import { Page } from "../components/Chrome";
import { ProductTile } from "../components/Commerce";

function Grid({ items, card, sort }) {
  const ordered = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      const ap = explainQuote(a, card).ranked[0];
      const bp = explainQuote(b, card).ranked[0];
      if (sort === "listed") return ap.listing.price - bp.listing.price;
      return ap.quote.payable - bp.quote.payable;
    });
    return copy;
  }, [items, card, sort]);

  if (!ordered.length) {
    return (
      <div className="border border-dashed border-line px-6 py-16 text-center">
        <p className="text-[16px] font-medium">Nothing in the demo catalog matches that.</p>
        <Link to="/ask" className="mt-3 inline-block text-[14px] font-semibold underline decoration-[#cccccc] underline-offset-4">
          Ask AfterCart instead
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {ordered.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}

function SortBar({ sort, setSort }) {
  const { card } = useShop();
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
      <p className="text-[13px] text-mute">Payable prices use {card.name}.</p>
      <div className="flex gap-2 text-[13px]">
        <button
          onClick={() => setSort("payable")}
          className={`border px-3 py-1.5 ${sort === "payable" ? "border-ink bg-ink text-white" : "border-line"}`}
        >
          Payable now
        </button>
        <button
          onClick={() => setSort("listed")}
          className={`border px-3 py-1.5 ${sort === "listed" ? "border-ink bg-ink text-white" : "border-line"}`}
        >
          Listed price
        </button>
      </div>
    </div>
  );
}

export function CategoriesPage() {
  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">Catalog</p>
        <h1 className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">Categories</h1>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-mute">
          A short demo catalog. Every product you open has at least two retailer listings.
        </p>
        <div className="mt-12 space-y-14">
          {categories.map((category) => (
            <section key={category.id}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{category.name}</h2>
                  <p className="mt-1 text-[14px] text-mute">{category.line}</p>
                </div>
                <Link to={`/category/${category.id}`} className="text-[13px] font-medium underline decoration-[#cccccc] underline-offset-4">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                {productsInCategory(category.id).map((product) => (
                  <ProductTile key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function CategoryPage() {
  const { id } = useParams();
  const category = getCategory(id);
  const { card } = useShop();
  const [sort, setSort] = useState("payable");
  if (!category) {
    return (
      <Page>
        <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8">
          <h1 className="text-[32px] font-semibold">That category is not in the catalog.</h1>
          <Link to="/categories" className="mt-4 inline-block underline">Back to categories</Link>
        </div>
      </Page>
    );
  }
  const items = productsInCategory(category.id);
  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">Category</p>
        <h1 className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">{category.name}</h1>
        <p className="mt-3 max-w-lg text-[15px] text-mute">{category.line}</p>
        <div className="mt-10">
          <SortBar sort={sort} setSort={setSort} />
          <Grid items={items} card={card} sort={sort} />
        </div>
      </div>
    </Page>
  );
}

export function BrandsPage() {
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">Brands in the demo catalog</p>
        <h1 className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">Brands</h1>
        <ul className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const count = products.filter((p) => p.brand === brand).length;
            return (
              <li key={brand} className="border-t border-line">
                <Link to={`/brands/${encodeURIComponent(brand)}`} className="flex items-baseline justify-between py-4 hover:text-leaf">
                  <span className="text-[22px] font-semibold tracking-[-0.03em]">{brand}</span>
                  <span className="text-[13px] text-mute">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Page>
  );
}

export function BrandPage() {
  const { name } = useParams();
  const brand = decodeURIComponent(name || "");
  const { card } = useShop();
  const [sort, setSort] = useState("payable");
  const items = products.filter((p) => p.brand === brand);
  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
        <Link to="/brands" className="text-[13px] text-mute hover:text-ink">Brands</Link>
        <h1 className="mt-3 text-[40px] font-semibold tracking-[-0.04em]">{brand}</h1>
        <div className="mt-10">
          <SortBar sort={sort} setSort={setSort} />
          <Grid items={items} card={card} sort={sort} />
        </div>
      </div>
    </Page>
  );
}

export function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const { card } = useShop();
  const [sort, setSort] = useState("payable");
  const skip = new Set(["the", "a", "an", "for", "under", "with", "my", "me", "on", "in", "to", "of", "is", "i", "and"]);
  const words = q
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[₹,]/g, ""))
    .filter((word) => word && !skip.has(word) && !/^\d+$/.test(word));
  const items = products.filter((p) => {
    const blob = `${p.name} ${p.brand} ${p.blurb} ${p.variant} ${p.category}`.toLowerCase();
    return words.length === 0 ? false : words.every((word) => blob.includes(word));
  });
  const orderish = /order|return|track|where|refund/.test(q.toLowerCase());

  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-8">
        <p className="text-[13px] text-mute">Search</p>
        <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.04em]">
          {q ? `“${q}”` : "Search the catalog"}
        </h1>
        {orderish && (
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-mute">
            That sounds like an order, not a product.{" "}
            <Link to={`/ask?q=${encodeURIComponent(q)}`} className="font-semibold text-ink underline decoration-[#cccccc] underline-offset-4">
              Ask AfterCart to check it
            </Link>
            .
          </p>
        )}
        <div className="mt-10">
          <SortBar sort={sort} setSort={setSort} />
          <Grid items={items} card={card} sort={sort} />
        </div>
      </div>
    </Page>
  );
}
