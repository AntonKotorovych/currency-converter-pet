"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurrencyState = void 0;
const react_1 = require("react");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const useCurrencyState = () => {
    const [currencyState, setCurrencyState] = (0, react_1.useState)({
        firstCurrencyInput: '',
        secondCurrencyInput: 1,
        selectedCurrency: null
    });
    const { response, error } = (0, ExchangeRatesProvider_1.useExchangeRates)();
    const onChangeInput = (0, react_1.useCallback)(({ value, name }) => {
        var _a;
        const rate = (_a = currencyState === null || currencyState === void 0 ? void 0 : currencyState.selectedCurrency) === null || _a === void 0 ? void 0 : _a.rate;
        if (!rate)
            return;
        if (value < 0)
            return;
        const ratios = {
            firstInput: {
                newFirstInputValue: value,
                newSecondInputValue: parseFloat((value / rate).toFixed(2))
            },
            secondInput: {
                newSecondInputValue: value,
                newFirstInputValue: parseFloat((value * rate).toFixed(2))
            }
        };
        const { newFirstInputValue, newSecondInputValue } = ratios[name] || {};
        setCurrencyState(prevState => (Object.assign(Object.assign({}, prevState), { firstCurrencyInput: newFirstInputValue, secondCurrencyInput: newSecondInputValue })));
    }, [currencyState === null || currencyState === void 0 ? void 0 : currencyState.selectedCurrency]);
    const onSelectCurrency = (0, react_1.useCallback)(newSelectedCurrency => {
        const newRate = newSelectedCurrency.rate;
        setCurrencyState(prevState => (Object.assign(Object.assign({}, prevState), { firstCurrencyInput: parseFloat((prevState.secondCurrencyInput * newRate).toFixed(2)), selectedCurrency: newSelectedCurrency })));
    }, []);
    (0, react_1.useEffect)(() => {
        if (error) {
            localStorage.clear();
            setCurrencyState(() => ({
                firstCurrencyInput: '',
                secondCurrencyInput: '',
                selectedCurrency: null
            }));
        }
    }, [error]);
    (0, react_1.useEffect)(() => {
        if (response && !currencyState.selectedCurrency)
            onSelectCurrency(response.find(currency => currency.cc === 'USD'));
    }, [response, currencyState.selectedCurrency, onSelectCurrency]);
    (0, react_1.useEffect)(() => {
        const storedCurrencyState = localStorage.getItem('currencyState');
        if (storedCurrencyState)
            setCurrencyState(JSON.parse(storedCurrencyState));
    }, []);
    (0, react_1.useEffect)(() => {
        if (currencyState.selectedCurrency) {
            localStorage.setItem('currencyState', JSON.stringify(currencyState));
        }
    }, [currencyState]);
    return { currencyState, onSelectCurrency, onChangeInput };
};
exports.useCurrencyState = useCurrencyState;
