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
const exchangeRatesResponse_1 = require("mocks/exchangeRatesResponse");
const App_1 = __importDefault(require("App"));
describe('App', () => {
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
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2022, 1, 24));
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    const renderComponent = () => (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}));
    test('renders component correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const { container } = renderComponent();
        yield (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByTestId('currency-rate-container')).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
    }));
});
