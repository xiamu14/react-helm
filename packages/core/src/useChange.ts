/**
 * @deprecated
 */

import isEqual from "lodash/isEqual";
import { useEffect, useRef } from "react";
export default function useChange<T>(action: (prop: T) => void, prop: T) {
  const prev = useRef<T | undefined>();
  const actionRef = useRef(action);

  useEffect(() => {
    if (!isEqual(prev.current, prop)) {
      prev.current = prop;
      actionRef.current(prop);
    }
  }, [prop]);
}
