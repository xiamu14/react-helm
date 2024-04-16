import type { ReactElement, ReactNode } from "react";
interface ForProps<T, U extends ReactNode> {
    /** Array to iterate over */
    each: ReadonlyArray<T> | undefined | null;
    /** RenderProp for children generation
     * OR a static element displayed each.length times */
    children: ReactNode | ((item: T, index: number) => U);
    /** Fallback item, displayed if *each* has zero length, or isn't an array */
    fallback?: ReactNode;
}
/** Component for mapping an array into collection of ReactNode's
 * Omits nullish children and provides keys if they're not specified.
 */
export default function For<T, U extends ReactNode>({ children, each, fallback }: ForProps<T, U>): ReactElement | null;
export {};
