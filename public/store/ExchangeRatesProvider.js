"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRatesProvider = exports.useExchangeRates = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NBU_API = import.meta.env.VITE_NBU_CURRENCY_EXCHANGE_API;
const ExchangeRatesContext = (0, react_1.createContext)(null);
const useExchangeRates = () => (0, react_1.useContext)(ExchangeRatesContext);
exports.useExchangeRates = useExchangeRates;
function ExchangeRatesProvider({ children }) {
    const [exchangeRates, setExchangeRates] = (0, react_1.useState)({
        response: null,
        isLoading: true,
        error: null
    });
    (0, react_1.useEffect)(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(NBU_API);
                const data = yield response.json();
                setExchangeRates({
                    response: data,
                    isLoading: false,
                    error: null
                });
            }
            catch (error) {
                setExchangeRates({
                    response: null,
                    isLoading: false,
                    error
                });
            }
        }))();
    }, []);
    return ((0, jsx_runtime_1.jsx)(ExchangeRatesContext.Provider, { value: exchangeRates, children: children }));
}
exports.ExchangeRatesProvider = ExchangeRatesProvider;
