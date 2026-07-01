import { ASSETS } from "@/config/assets";

export function ChileDivider() {
  return (
    <div
      aria-hidden
      className="h-12 w-full bg-negro bg-repeat-x md:h-16"
      style={{
        backgroundImage: `url(${ASSETS.chileDivider})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
      }}
    />
  );
}

export function FruitBorder() {
  return (
    <div className="w-full bg-negro">
      <img src={ASSETS.fruitBorder} alt="" aria-hidden className="block w-full object-cover" />
    </div>
  );
}
