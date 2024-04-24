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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
const exchangeRatesResponse_1 = require("mocks/exchangeRatesResponse");
describe('ExchangeRatesProvider', () => {
    const originalFetch = global.fetch;
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(exchangeRatesResponse_1.mockResponse)
        }));
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    const TestComponent = () => {
        const rates = (0, ExchangeRatesProvider_1.useExchangeRates)();
        return JSON.stringify(rates);
    };
    const renderComponent = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(ExchangeRatesProvider_1.ExchangeRatesProvider, { children: (0, jsx_runtime_1.jsx)("div", { "data-testid": "container", children: (0, jsx_runtime_1.jsx)(TestComponent, {}) }) }));
    describe('when response', () => {
        test('returns fetch request default value', () => __awaiter(void 0, void 0, void 0, function* () {
            renderComponent();
            yield (0, react_1.waitFor)(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
            });
            yield (0, react_1.waitFor)(() => {
                expect(react_1.screen.getByTestId('container')).toHaveTextContent(JSON.stringify({
                    response: exchangeRatesResponse_1.mockResponse,
                    isLoading: false,
                    error: null
                }));
            });
        }));
    });
    describe('when isLoading', () => {
        global.fetch = jest.fn(() => new Promise(() => { }));
        test('returns isLoading true value', () => __awaiter(void 0, void 0, void 0, function* () {
            renderComponent();
            yield (0, react_1.waitFor)(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
            });
            yield (0, react_1.waitFor)(() => {
                expect(react_1.screen.getByTestId('container')).toHaveTextContent(JSON.stringify({
                    response: null,
                    isLoading: true,
                    error: null
                }));
            });
        }));
    });
    describe('when error', () => {
        test('returns correct error value', () => __awaiter(void 0, void 0, void 0, function* () {
            global.fetch = jest.fn().mockResolvedValueOnce({
                json: () => Promise.reject({ title: 'Error 404', name: 'Not Found' })
            });
            renderComponent();
            yield (0, react_1.waitFor)(() => {
                expect(fetch).toHaveBeenCalledTimes(1);
            });
            yield (0, react_1.waitFor)(() => {
                expect(react_1.screen.getByTestId('container')).toHaveTextContent(JSON.stringify({
                    response: null,
                    isLoading: false,
                    error: { title: 'Error 404', name: 'Not Found' }
                }));
            });
        }));
    });
});
