import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, isValidElement } from "react";
import validElement from "./validElement";
/** Component for mapping an array into collection of ReactNode's
 * Omits nullish children and provides keys if they're not specified.
 */
export default function For({ children, each, fallback = null }) {
    if (!Array.isArray(each) || !each.length || children == null) {
        return validElement(fallback);
    }
    if (typeof children !== "function") {
        return (_jsx(_Fragment, { children: each.map((_, idx) => (_jsx(Fragment, { children: children }, idx))) }));
    }
    const content = [];
    for (let i = 0; i < each.length; i++) {
        const child = children(each[i], i);
        if (child == null) {
            continue;
        }
        if (!isValidElement(child) || !child.key) {
            content.push(_jsx(Fragment, { children: child }, i));
        }
        else {
            content.push(child);
        }
    }
    if (!content.length) {
        return validElement(fallback);
    }
    return _jsx(_Fragment, { children: content });
}
