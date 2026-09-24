import Image from "next/image";
import symbol from "@/assets/SVG/SímboloNegativo.svg";
import type { LogoSymbolProps } from "@/types/LogoSymbolProps";

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