import { ASSETS } from "@/config/assets";

export function ChileDivider() {
  return (
      <div className="-my-12 w-full bg-negro">
      <img src={ASSETS.chileDivider} alt="" aria-hidden className="block h-12 w-full object-cover md:h-16" />
    </div>
  );
}

export function FruitBorder() {
  return (
    <div className="w-full bg-negro">
      <img src={ASSETS.fruitBorder} alt="" aria-hidden className="block w-full object-cover" />
    </div>
  );
}
