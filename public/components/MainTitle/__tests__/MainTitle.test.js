"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const __1 = __importDefault(require(".."));
describe('MainTitle', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2022, 1, 24));
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    test('renders component correctly', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, {}));
        const titleElement = react_1.screen.getByRole('heading', { level: 1 });
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Актуальні Курси Валют станом на 24.02.2022');
    });
});
