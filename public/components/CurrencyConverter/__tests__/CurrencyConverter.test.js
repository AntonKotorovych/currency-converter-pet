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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const exchangeRatesResponse_1 = require("mocks/exchangeRatesResponse");
const useCurrencyState_1 = require("hooks/useCurrencyState");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const __1 = __importDefault(require(".."));
jest.mock('hooks/useCurrencyState');
jest.mock('store/ExchangeRatesProvider');
describe('CurrencyConverter', () => {
    const onChangeInput = jest.fn();
    const defaultCurrencyState = {
        currencyState: {
            firstCurrencyInput: 38.9945,
            secondCurrencyInput: 1,
            selectedCurrency: exchangeRatesResponse_1.mockResponse.find(currency => currency.cc === 'USD')
        },
        onChangeInput,
        onSelectCurrency: jest.fn()
    };
    const defaultRatesState = {
        response: exchangeRatesResponse_1.mockResponse,
        isLoading: false,
        error: null
    };
    const setExchangeRates = (state = defaultRatesState) => {
        ExchangeRatesProvider_1.useExchangeRates.mockReturnValue(state);
    };
    const setCurrencyState = (state = defaultCurrencyState) => {
        useCurrencyState_1.useCurrencyState.mockReturnValue(state);
    };
    const renderComponent = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, {}));
    beforeEach(() => {
        jest.clearAllMocks();
        setExchangeRates();
        setCurrencyState();
    });
    describe('without loading', () => {
        test('renders component correctly', () => {
            setExchangeRates();
            renderComponent();
            expect(react_1.screen.getByTestId('firstInput')).toBeInTheDocument();
            expect(react_1.screen.getByTestId('secondInput')).toBeInTheDocument();
            expect(react_1.screen.getByRole('combobox')).toBeInTheDocument();
        });
        describe('when user types values', () => {
            test('calls onChange() with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
                setExchangeRates();
                renderComponent();
                yield user_event_1.default.type(react_1.screen.getByTestId('firstInput'), '5');
                expect(onChangeInput).toHaveBeenCalledWith({
                    name: 'firstInput',
                    value: '38.99455'
                });
            }));
        });
    });
    describe('with loading', () => {
        test('render spinner', () => {
            setExchangeRates(Object.assign(Object.assign({}, defaultRatesState), { response: null, isLoading: true }));
            renderComponent();
            expect(react_1.screen.getByTestId('spinner')).toBeInTheDocument();
        });
    });
});
