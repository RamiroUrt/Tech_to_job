import Image from "next/image";
import symbol from "@/assets/SVG/SímboloNegativo.svg";

type LogoSymbolProps = {
  className?: string;
};

export function LogoSymbol({ className }: LogoSymbolProps) {
  return (
    <Image
      src={symbol}
      alt=""
      width={32}
      height={32}
      className={className}
      aria-hidden
    />
  );
}