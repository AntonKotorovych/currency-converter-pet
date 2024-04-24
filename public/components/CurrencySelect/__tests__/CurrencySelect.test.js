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
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const exchangeRatesResponse_1 = require("mocks/exchangeRatesResponse");
const __1 = __importDefault(require(".."));
jest.mock('store/ExchangeRatesProvider');
describe('CurrencySelect', () => {
    const defaultRatesState = {
        response: []
    };
    const setExchangeRates = (state = defaultRatesState) => ExchangeRatesProvider_1.useExchangeRates.mockReturnValue(state);
    const onChange = jest.fn();
    const requiredProps = {
        value: 'USD',
        onChange
    };
    const renderComponent = (props = requiredProps) => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, Object.assign({}, props)));
    beforeEach(() => {
        jest.clearAllMocks();
        setExchangeRates();
    });
    test('renders component correctly', () => {
        renderComponent();
        expect(react_1.screen.getByRole('combobox')).toBeInTheDocument();
    });
    describe('when user selects options', () => {
        describe('with response', () => {
            describe('when user selects currency', () => {
                test('calls onChange()', () => __awaiter(void 0, void 0, void 0, function* () {
                    setExchangeRates({ response: exchangeRatesResponse_1.mockResponse });
                    renderComponent();
                    yield user_event_1.default.selectOptions(react_1.screen.getByRole('combobox'), 'EUR');
                    expect(onChange).toHaveBeenCalledWith({
                        cc: 'EUR',
                        txt: 'Євро',
                        rate: 42.3519,
                        r030: 978,
                        exchangedate: '10.04.2024'
                    });
                }));
            });
        });
        describe('without response', () => {
            test('does not call onChange()', () => __awaiter(void 0, void 0, void 0, function* () {
                setExchangeRates({ response: null });
                renderComponent();
                const select = react_1.screen.getByRole('combobox');
                expect(select).toBeInTheDocument();
                yield user_event_1.default.click(select);
                expect(onChange).not.toHaveBeenCalled();
            }));
        });
    });
});
