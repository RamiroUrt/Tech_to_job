import type { RefObject } from "react";
import type { Messages } from "./Messages";

export type HeroNotebookProps = {
  messages: Messages;
  laptopRef: RefObject<HTMLDivElement | null>;
  screenRef: RefObject<HTMLDivElement | null>;
  baseRef: RefObject<HTMLDivElement | null>;
};
