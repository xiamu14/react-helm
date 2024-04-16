import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { isValidElement } from "react";
export default function validElement(item) {
    if (item == null) {
        return null;
    }
    if (isValidElement(item)) {
        return item;
    }
    return _jsx(_Fragment, { children: item });
}
