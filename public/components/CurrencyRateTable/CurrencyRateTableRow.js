"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CurrencyRateTable_module_scss_1 = __importDefault(require("./CurrencyRateTable.module.scss"));
function CurrencyRateTableRow({ name, rate }) {
    return ((0, jsx_runtime_1.jsxs)("tr", { className: CurrencyRateTable_module_scss_1.default['currency-rate-table__row'], children: [(0, jsx_runtime_1.jsx)("td", { children: name }), (0, jsx_runtime_1.jsx)("td", { children: rate })] }));
}
exports.default = CurrencyRateTableRow;
