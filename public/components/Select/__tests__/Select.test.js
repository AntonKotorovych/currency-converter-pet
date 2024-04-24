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
describe('Select', () => {
    const onChange = jest.fn();
    const requiredProps = {
        options: [
            {
                value: 'USD',
                label: 'Долар США'
            },
            {
                value: 'AUD',
                label: 'Австралійський долар'
            },
            {
                value: 'EUR',
                label: 'Євро'
            }
        ],
        value: 'USD',
        onChange
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const renderComponent = (props = requiredProps) => (0, react_1.render)((0, jsx_runtime_1.jsx)(__1.default, Object.assign({}, props)));
    test('renders component correctly', () => {
        renderComponent();
        expect(react_1.screen.getByRole('combobox')).toBeInTheDocument();
    });
    describe('when user selects value', () => {
        test('calls onChange() with correct value', () => __awaiter(void 0, void 0, void 0, function* () {
            renderComponent();
            yield user_event_1.default.selectOptions(react_1.screen.getByRole('combobox'), 'AUD');
            expect(onChange).toHaveBeenCalledWith('AUD');
        }));
    });
    describe('without onChange', () => {
        describe('when user selects a value', () => {
            test('does not throw an error', () => __awaiter(void 0, void 0, void 0, function* () {
                renderComponent(Object.assign(Object.assign({}, requiredProps), { onChange: undefined }));
                yield user_event_1.default.selectOptions(react_1.screen.getByRole('combobox'), 'EUR');
                expect(onChange).not.toHaveBeenCalled();
            }));
        });
    });
});
