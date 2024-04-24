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
describe('CurrencyRateTable', () => {
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
        test('renders component correctly', () => {
            setExchangeRates();
            renderComponent();
            expect(react_1.screen.getByTestId('searchInput')).toBeInTheDocument();
            expect(react_1.screen.getByRole('table')).toBeInTheDocument();
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
        test('renders error text', () => {
            setExchangeRates({
                response: null,
                isLoading: false,
                error: { name: 'Error 404', message: 'Not Found' }
            });
            renderComponent();
            expect(react_1.screen.getByRole('heading', { level: 3 })).toHaveTextContent('Сталася помилка: Error 404. Not Found');
        });
    });
    describe('when user types value into the search input', () => {
        test('changes the value in input field', () => __awaiter(void 0, void 0, void 0, function* () {
            setExchangeRates();
            renderComponent();
            const searchInput = react_1.screen.getByTestId('searchInput');
            yield user_event_1.default.type(searchInput, 'USD');
            expect(searchInput.value).toBe('USD');
        }));
        test('filters list', () => __awaiter(void 0, void 0, void 0, function* () {
            setExchangeRates();
            renderComponent();
            const searchInput = react_1.screen.getByTestId('searchInput');
            yield user_event_1.default.type(searchInput, 'Долар');
            const filteredList = react_1.screen.getByRole('textbox');
            expect(searchInput.value).toBe('Долар');
            expect(filteredList).toBeInTheDocument();
            expect(react_1.screen.getByText('Долар США')).toBeInTheDocument();
            expect(react_1.screen.queryByText('Євро')).not.toBeInTheDocument();
            expect(react_1.screen.queryByText('Японська Єна')).not.toBeInTheDocument();
        }));
    });
});
