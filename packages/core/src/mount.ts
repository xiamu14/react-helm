import { useEffect, useRef } from "react";
type Action = () => void;
export function useMount(action: Action) {
  const actionRef = useRef(action);
  const mountRef = useRef(false);
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      actionRef.current();
    }
  }, []);
}

export function useUnmount(action: Action) {
  const actionRef = useRef(action);

  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
      requestAnimationFrame(() => {
        if (!mountRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          actionRef.current();
        }
      });
    };
  }, []);
}
