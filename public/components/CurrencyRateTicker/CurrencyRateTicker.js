"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const Spinner_1 = __importDefault(require("components/Spinner"));
const Error_1 = __importDefault(require("components/Error"));
const Currency_1 = __importDefault(require("./Currency"));
const CurrencyRateTicker_module_scss_1 = __importDefault(require("./CurrencyRateTicker.module.scss"));
function CurrencyRateTicker() {
    const { response, isLoading, error } = (0, ExchangeRatesProvider_1.useExchangeRates)();
    const classNames = (0, clsx_1.default)(CurrencyRateTicker_module_scss_1.default['currency-rate-container'], CurrencyRateTicker_module_scss_1.default['currency-rate-container--status']);
    if (error)
        return ((0, jsx_runtime_1.jsx)("div", { className: classNames, children: (0, jsx_runtime_1.jsx)(Error_1.default, { title: error.name, message: error.message }) }));
    if (!response && isLoading)
        return ((0, jsx_runtime_1.jsx)("div", { className: classNames, children: (0, jsx_runtime_1.jsx)(Spinner_1.default, {}) }));
    return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "currency-rate-container", className: CurrencyRateTicker_module_scss_1.default['currency-rate-container'], children: (0, jsx_runtime_1.jsx)("ul", { className: CurrencyRateTicker_module_scss_1.default['currency-rate-list'], children: response.map(currency => ((0, jsx_runtime_1.jsx)(Currency_1.default, { title: currency.txt, rate: currency.rate }, currency.cc))) }) }));
}
exports.default = CurrencyRateTicker;
