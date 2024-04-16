export default function useDelayAnime({ delay, period, onRun, onFinish, debug }: {
    delay: number;
    period: number;
    onRun?: () => void;
    onFinish?: () => void;
    debug?: boolean;
}): {
    stop: () => void;
    start: () => void;
};
