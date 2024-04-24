"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MainTitle_1 = __importDefault(require("components/MainTitle"));
const CurrencyRateTicker_1 = __importDefault(require("components/CurrencyRateTicker"));
const CurrencyConverter_1 = __importDefault(require("components/CurrencyConverter"));
const CurrencyRateTable_1 = __importDefault(require("components/CurrencyRateTable"));
const HomePage_module_scss_1 = __importDefault(require("./HomePage.module.scss"));
function HomePage() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MainTitle_1.default, {}), (0, jsx_runtime_1.jsx)(CurrencyRateTicker_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: HomePage_module_scss_1.default['main-interface'], children: [(0, jsx_runtime_1.jsx)(CurrencyConverter_1.default, {}), (0, jsx_runtime_1.jsx)(CurrencyRateTable_1.default, {})] })] }));
}
exports.default = HomePage;
