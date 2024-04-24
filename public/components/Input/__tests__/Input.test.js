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
const __1 = __importDefault(require(".."));
describe('Input', () => {
    const onChange = jest.fn();
    const requiredProps = {
        type: 'number',
        name: 'firstInput',
        value: 1,
        onChange,
        'data-testid': 'firstInput'
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const renderComponent = (props = requiredProps) => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, Object.assign({}, props)));
    test('renders component correctly', () => {
        renderComponent();
        expect(react_1.screen.getByTestId('firstInput')).toBeInTheDocument();
    });
    describe('when user types values', () => {
        test('calls onChange()', () => __awaiter(void 0, void 0, void 0, function* () {
            renderComponent();
            yield user_event_1.default.type(react_1.screen.queryByTestId('firstInput'), '1');
            expect(onChange).toHaveBeenCalled();
        }));
    });
});
