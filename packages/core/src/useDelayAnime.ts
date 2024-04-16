import { useCallback, useEffect, useRef, useState } from "react";

enum State {
  RUNNING,
  FINISHED,
}

export default function useDelayAnime({ delay, period, onRun, onFinish, debug }: { delay: number; period: number; onRun?: () => void; onFinish?: () => void; debug?: boolean }) {
  const [state, setState] = useState<State>();
  const startRef = useRef<number>(0);
  const delayRef = useRef<number>(delay);
  const periodRef = useRef(period);
  const debugRef = useRef(debug);
  const startTimerRef = useRef<number>();

  const start = useCallback(() => {
    if (state === undefined) {
      startTimerRef.current = setTimeout(() => {
        if (state === undefined) {
          setState(State.RUNNING);
          startRef.current = Date.now();
          onRun?.();
        }
      }, delayRef.current);
    }
  }, [onRun, state]);

  useEffect(() => {
    if (state === State.FINISHED) {
      if (debugRef.current && startRef.current) {
        console.log("--running time", Date.now() - startRef.current);
      }
      onFinish?.();
      setState(undefined);
      clearTimeout(startTimerRef.current);
    }
  }, [state, onFinish]);

  const stop = useCallback(() => {
    if (state === State.RUNNING) {
      const runTime = Date.now() - startRef.current;
      const duration = runTime < periodRef.current ? periodRef.current - runTime : periodRef.current - (runTime % periodRef.current);
      if (debugRef.current) {
        console.log("--duration", runTime, periodRef.current % runTime, duration);
      }
      if (duration > 0) {
        // TODO: 完成动画周期
        setTimeout(() => {
          setState(State.FINISHED);
        }, duration);
      } else {
        setState(State.FINISHED);
      }
    } else if (state === undefined) {
      setState(State.FINISHED);
    }
  }, [state]);

  return { stop, start };
}
