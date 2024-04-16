import { isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

export default function validElement(item: ReactNode | undefined | null): ReactElement | null {
  if (item == null) {
    return null;
  }
  if (isValidElement(item)) {
    return item;
  }
  return <>{item}</>;
}
