"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const prop_types_1 = __importDefault(require("prop-types"));
Select.propTypes = {
    options: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        value: prop_types_1.default.string.isRequired,
        label: prop_types_1.default.string.isRequired
    })),
    value: prop_types_1.default.string,
    onChange: prop_types_1.default.func
};
function Select({ options, onChange, value }) {
    const handleSelectChange = event => {
        const newValue = event.target.value;
        if (onChange) {
            onChange(newValue);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "input-container", children: (0, jsx_runtime_1.jsx)("select", { value: value, onChange: handleSelectChange, children: options === null || options === void 0 ? void 0 : options.map(option => {
                return ((0, jsx_runtime_1.jsx)("option", { value: option.value, children: option.label }, option.value));
            }) }) }));
}
exports.default = (0, react_1.memo)(Select);
