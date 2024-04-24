"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = require("react");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const Select_1 = __importDefault(require("components/Select"));
CurrencySelect.propTypes = {
    value: prop_types_1.default.string,
    onChange: prop_types_1.default.func.isRequired
};
function CurrencySelect({ value, onChange }) {
    const { response } = (0, ExchangeRatesProvider_1.useExchangeRates)();
    const handleSelectCurrency = (0, react_1.useCallback)(value => {
        const newSelectedCurrency = response.find(currency => currency.cc === value);
        onChange(newSelectedCurrency);
    }, [response, onChange]);
    const normalizedOptions = (0, react_1.useMemo)(() => {
        return response === null || response === void 0 ? void 0 : response.map(currency => ({
            value: currency.cc,
            label: currency.txt
        }));
    }, [response]);
    return ((0, jsx_runtime_1.jsx)(Select_1.default, { options: normalizedOptions, value: value, onChange: handleSelectCurrency }));
}
exports.default = (0, react_1.memo)(CurrencySelect);
