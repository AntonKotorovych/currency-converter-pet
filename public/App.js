"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const HomePage_1 = __importDefault(require("pages/HomePage"));
const ExchangeRatesProvider_1 = require("store/ExchangeRatesProvider");
function App() {
    return ((0, jsx_runtime_1.jsx)(ExchangeRatesProvider_1.ExchangeRatesProvider, { children: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}) }));
}
exports.default = App;
