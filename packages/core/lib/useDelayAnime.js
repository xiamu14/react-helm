import { useCallback, useEffect, useRef, useState } from "react";
var State;
(function (State) {
    State[State["RUNNING"] = 0] = "RUNNING";
    State[State["FINISHED"] = 1] = "FINISHED";
})(State || (State = {}));
export default function useDelayAnime({ delay, period, onRun, onFinish, debug }) {
    const [state, setState] = useState();
    const startRef = useRef(0);
    const delayRef = useRef(delay);
    const periodRef = useRef(period);
    const debugRef = useRef(debug);
    const startTimerRef = useRef();
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
            }
            else {
                setState(State.FINISHED);
            }
        }
        else if (state === undefined) {
            setState(State.FINISHED);
        }
    }, [state]);
    return { stop, start };
}
