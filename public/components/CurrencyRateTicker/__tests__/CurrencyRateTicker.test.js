"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const exchangeRatesResponse_1 = require("mocks/exchangeRatesResponse");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const __1 = __importDefault(require(".."));
jest.mock('store/ExchangeRatesProvider');
describe('CurrencyRateTicker', () => {
    const defaultRatesState = {
        response: exchangeRatesResponse_1.mockResponse,
        isLoading: false,
        error: null
    };
    const setExchangeRates = (state = defaultRatesState) => ExchangeRatesProvider_1.useExchangeRates.mockReturnValue(state);
    beforeEach(() => {
        jest.clearAllMocks();
        setExchangeRates();
    });
    const renderComponent = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, {}));
    describe('without loading', () => {
        test('renders the exchange rates list', () => {
            setExchangeRates();
            renderComponent();
            expect(react_1.screen.getByRole('list')).toBeInTheDocument();
        });
    });
    describe('with loading', () => {
        test('renders spinner', () => {
            setExchangeRates(Object.assign(Object.assign({}, defaultRatesState), { response: null, isLoading: true }));
            renderComponent();
            expect(react_1.screen.getByTestId('spinner')).toBeInTheDocument();
        });
    });
    describe('with error', () => {
        test('renders error', () => {
            setExchangeRates({
                response: null,
                isLoading: false,
                error: { name: 'Error 404', message: 'Not Found' }
            });
            renderComponent();
            const error = react_1.screen.getByRole('heading', { level: 3 });
            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent('Сталася помилка: Error 404. Not Found');
        });
    });
});
