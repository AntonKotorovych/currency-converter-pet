"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MainTitle_module_scss_1 = __importDefault(require("./MainTitle.module.scss"));
function MainTitle() {
    const date = new Intl.DateTimeFormat('uk-UA').format(new Date());
    return ((0, jsx_runtime_1.jsx)("div", { className: MainTitle_module_scss_1.default['main-title-container'], children: (0, jsx_runtime_1.jsxs)("h1", { children: ["\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0456 \u041A\u0443\u0440\u0441\u0438 \u0412\u0430\u043B\u044E\u0442 \u0441\u0442\u0430\u043D\u043E\u043C \u043D\u0430 ", date] }) }));
}
exports.default = MainTitle;
