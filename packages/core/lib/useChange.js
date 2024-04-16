/**
 * @deprecated
 */
import isEqual from "lodash/isEqual";
import { useEffect, useRef } from "react";
export default function useChange(action, prop) {
    const prev = useRef();
    const actionRef = useRef(action);
    useEffect(() => {
        if (!isEqual(prev.current, prop)) {
            prev.current = prop;
            actionRef.current(prop);
        }
    }, [prop]);
}
