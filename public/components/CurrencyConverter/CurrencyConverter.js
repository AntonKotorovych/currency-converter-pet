"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const useCurrencyState_1 = require("hooks/useCurrencyState");
const Input_1 = __importDefault(require("components/Input"));
const CurrencySelect_1 = __importDefault(require("components/CurrencySelect"));
const Spinner_1 = __importDefault(require("components/Spinner"));
const CurrencyConverter_module_scss_1 = __importDefault(require("./CurrencyConverter.module.scss"));
function CurrencyConverter() {
    var _a;
    const { currencyState, onChangeInput, onSelectCurrency } = (0, useCurrencyState_1.useCurrencyState)();
    const { isLoading } = (0, ExchangeRatesProvider_1.useExchangeRates)();
    const handleInputChange = (0, react_1.useCallback)(event => {
        const { name, value } = event.target;
        onChangeInput({ name, value });
    }, [onChangeInput]);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: CurrencyConverter_module_scss_1.default['currency-converter'], children: [(0, jsx_runtime_1.jsxs)("div", { className: CurrencyConverter_module_scss_1.default['currency-converter__block-main'], children: [(0, jsx_runtime_1.jsx)(Input_1.default, { type: "number", name: "firstInput", id: "firstInput", step: "0.01", value: currencyState.firstCurrencyInput, onChange: handleInputChange, "data-testid": "firstInput" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "firstInput", children: "UAH" })] }), (0, jsx_runtime_1.jsxs)("div", { className: CurrencyConverter_module_scss_1.default['currency-converter__block-secondary'], children: [(0, jsx_runtime_1.jsx)(Input_1.default, { type: "number", name: "secondInput", id: "secondInput", step: "0.01", value: currencyState.secondCurrencyInput, onChange: handleInputChange, "data-testid": "secondInput" }), (0, jsx_runtime_1.jsx)(CurrencySelect_1.default, { value: (_a = currencyState.selectedCurrency) === null || _a === void 0 ? void 0 : _a.cc, onChange: onSelectCurrency })] })] }));
}
exports.default = CurrencyConverter;
