import type { RefObject } from "react";

export type HeroNotebookProps = {
  laptopRef: RefObject<HTMLDivElement | null>;
  screenRef: RefObject<HTMLDivElement | null>;
  baseRef: RefObject<HTMLDivElement | null>;
};
