"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Error_module_scss_1 = __importDefault(require("./Error.module.scss"));
function Error({ title, message }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: Error_module_scss_1.default['error'], children: (0, jsx_runtime_1.jsxs)("h3", { children: ["\u0421\u0442\u0430\u043B\u0430\u0441\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430: ", title, ". ", message] }) }));
}
exports.default = Error;
