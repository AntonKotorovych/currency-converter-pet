"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const prop_types_1 = __importDefault(require("prop-types"));
Input.propTypes = {
    type: prop_types_1.default.string.isRequired,
    name: prop_types_1.default.string.isRequired,
    id: prop_types_1.default.string,
    step: prop_types_1.default.string,
    value: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]).isRequired,
    onChange: prop_types_1.default.func.isRequired,
    'data-testid': prop_types_1.default.string
};
function Input(props) {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", Object.assign({}, props)) }));
}
exports.default = Input;
