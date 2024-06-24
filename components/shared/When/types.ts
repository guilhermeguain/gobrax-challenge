import { ReactNode } from "react";

export type WhenProps = {
  children: ReactNode | (() => void);
  value: unknown;
};
