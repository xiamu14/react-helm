import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export default function Show({ when, fallback, children }) {
    return Boolean(when) ? _jsx(_Fragment, { children: children }) : fallback ? fallback() : _jsx(_Fragment, {});
}
