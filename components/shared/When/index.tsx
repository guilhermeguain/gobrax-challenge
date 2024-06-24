import { ReactElement } from "react";

import { WhenProps } from "./types";

export const When = ({ children, value }: WhenProps) => {
  if (value)
    return (
      typeof children === "function" ? children() : children
    ) as ReactElement;
  return <></>;
};
