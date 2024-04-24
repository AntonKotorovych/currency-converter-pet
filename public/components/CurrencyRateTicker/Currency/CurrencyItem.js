"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const prop_types_1 = __importDefault(require("prop-types"));
const CurrencyItem_module_scss_1 = __importDefault(require("./CurrencyItem.module.scss"));
CurrencyItem.propTypes = {
    title: prop_types_1.default.string.isRequired,
    rate: prop_types_1.default.number.isRequired
};
function CurrencyItem({ title, rate }) {
    return ((0, jsx_runtime_1.jsxs)("li", { className: CurrencyItem_module_scss_1.default['list-item'], children: [title, " - ", rate, " \u20B4"] }));
}
exports.default = CurrencyItem;
