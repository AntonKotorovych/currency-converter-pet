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
describe('HomePage', () => {
    const defaultRatesState = {
        response: exchangeRatesResponse_1.mockResponse
    };
    const setExchangeRates = (state = defaultRatesState) => ExchangeRatesProvider_1.useExchangeRates.mockReturnValue(state);
    const renderComponent = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, {}));
    beforeEach(() => {
        jest.clearAllMocks();
        setExchangeRates();
    });
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2022, 1, 24));
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    test('matches snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
