"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const __1 = __importDefault(require(".."));
describe('Spinner', () => {
    test('renders component correctly', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, {}));
        expect(react_1.screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
