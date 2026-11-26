import { Link, useParams } from "react-router-dom";
import { categories, getProduct } from "../data";
import { Page } from "../components/Chrome";
import { CardSwitch, PricePanels } from "../components/Commerce";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);

  if (!product) {
    return (
      <Page>
        <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8">
          <h1 className="text-[32px] font-semibold">That product is not in the catalog.</h1>
          <Link to="/" className="mt-4 inline-block underline">Back home</Link>
        </div>
      </Page>
    );
  }

  const category = categories.find((c) => c.id === product.category);

  return (
    <Page>
      <div className="mx-auto max-w-[1120px] px-5 py-10 md:px-8 md:py-14">
        <p className="text-[13px] text-mute">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="px-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-ink">{category?.name}</Link>
        </p>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[#EFECE6]">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div>
            <p className="text-[13px] text-mute">{product.brand}</p>
            <h1 className="mt-2 text-[36px] font-semibold leading-tight tracking-[-0.04em]">{product.name}</h1>
            <p className="mt-3 text-[15px] text-[#444]">{product.blurb}</p>
            <p className="mt-4 text-[14px] text-ink">{product.variant}</p>
            <p className="mt-1 text-[14px] text-mute">{product.match}</p>

            <div className="mt-8">
              <p className="mb-3 text-[13px] font-medium text-mute">Price this for</p>
              <CardSwitch />
            </div>

            <div className="mt-8">
              <PricePanels product={product} />
            </div>

            <Link
              to={`/ask?q=${encodeURIComponent(`Compare the ${product.name} for my card`)}`}
              className="mt-8 inline-flex h-12 items-center bg-ink px-5 text-[14px] font-semibold text-white hover:bg-[#2a2a2a]"
            >
              Ask a follow-up
            </Link>
            <p className="mt-4 max-w-md text-[12px] leading-relaxed text-mute">
              Demo listings. Payable now includes the instant offer, coupon and delivery. Expected cashback is shown on its own and is not money off today.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
