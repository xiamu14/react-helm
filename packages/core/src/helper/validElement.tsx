import { isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export function validElement(item: ReactNode | undefined | null): ReactElement | null {
  if (item == null) {
    return null;
  }
  if (isValidElement(item)) {
    return item;
  }
  return <>{item}</>;
}
