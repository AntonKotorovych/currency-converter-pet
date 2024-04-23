"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const __1 = __importDefault(require(".."));
describe('Error', () => {
    const requiredProps = { title: '404', message: 'Not Found' };
    const renderComponent = (props = requiredProps) => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, Object.assign({}, props)));
    };
    test('renders component correctly', () => {
        renderComponent();
        const error = react_1.screen.getByRole('heading', { level: 3 });
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent('Сталася помилка: 404. Not Found');
    });
});
