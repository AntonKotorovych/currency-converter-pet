"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const __1 = __importDefault(require(".."));
describe('CurrencyItem', () => {
    const requiredProps = {
        title: 'Доллар США',
        rate: 50.25
    };
    const renderComponent = (props = requiredProps) => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, Object.assign({}, props)));
    };
    test('renders component correctly', () => {
        renderComponent();
        expect(react_1.screen.getByRole('listitem')).toBeInTheDocument();
    });
    describe('with correct title', () => {
        test('renders component correctly', () => {
            renderComponent();
            const currencyItem = react_1.screen.getByRole('listitem');
            expect(currencyItem).toBeInTheDocument();
            expect(currencyItem).toHaveTextContent('Доллар США - 50.25 ₴');
        });
    });
});
