"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const Input_1 = __importDefault(require("components/Input"));
const Spinner_1 = __importDefault(require("components/Spinner"));
const Error_1 = __importDefault(require("components/Error"));
const CurrencyRateTableRow_1 = __importDefault(require("./CurrencyRateTableRow"));
const CurrencyRateTable_module_scss_1 = __importDefault(require("./CurrencyRateTable.module.scss"));
function CurrencyRateTable() {
    const [searchValue, setSearchSearch] = (0, react_1.useState)('');
    const { response, isLoading, error } = (0, ExchangeRatesProvider_1.useExchangeRates)();
    const filteredList = (0, react_1.useMemo)(() => {
        return response === null || response === void 0 ? void 0 : response.filter(currency => currency.txt.toLowerCase().includes(searchValue.toLowerCase()));
    }, [response, searchValue]);
    if (isLoading)
        return (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    if (error) {
        return ((0, jsx_runtime_1.jsx)("div", { className: CurrencyRateTable_module_scss_1.default['table-wrapper'], children: (0, jsx_runtime_1.jsx)(Error_1.default, { title: error.name, message: error.message }) }));
    }
    const handleSearchChange = event => {
        setSearchSearch(event.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: CurrencyRateTable_module_scss_1.default['table-wrapper'], children: [(0, jsx_runtime_1.jsx)("div", { className: CurrencyRateTable_module_scss_1.default['currency-search'], children: (0, jsx_runtime_1.jsx)(Input_1.default, { type: "text", name: "search", value: searchValue, onChange: handleSearchChange, placeholder: "\u041F\u043E\u0448\u0443\u043A \u0412\u0430\u043B\u044E\u0442\u0438...", "data-testid": "searchInput" }) }), (0, jsx_runtime_1.jsx)("div", { className: CurrencyRateTable_module_scss_1.default['currency-rate-table-container'], children: (0, jsx_runtime_1.jsxs)("table", { className: CurrencyRateTable_module_scss_1.default['currency-rate-table'], children: [(0, jsx_runtime_1.jsx)("thead", { className: CurrencyRateTable_module_scss_1.default.thead, children: (0, jsx_runtime_1.jsxs)("tr", { className: CurrencyRateTable_module_scss_1.default['currency-rate-table__head'], children: [(0, jsx_runtime_1.jsx)("th", { children: "\u0412\u0430\u043B\u044E\u0442\u0430" }), (0, jsx_runtime_1.jsx)("th", { children: "\u041A\u0443\u0440\u0441" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredList.length ? (filteredList.map(currency => {
                                return ((0, jsx_runtime_1.jsx)(CurrencyRateTableRow_1.default, { name: currency.txt, rate: currency.rate }, currency.txt));
                            })) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { className: CurrencyRateTable_module_scss_1.default['currency-is-not-found'], children: "\u0412\u0430\u043B\u044E\u0442\u0443 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E" }) })) })] }) })] }));
}
exports.default = CurrencyRateTable;
