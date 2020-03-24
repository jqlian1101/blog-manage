// import "@babel/polyfill";
import "core-js/es/set";
import "core-js/es/map";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import { ConfigProvider } from "antd";

import zhCN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";

import './styles/index.scss'

import App from "./App";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <HashRouter>
            <App />
        </HashRouter>
    </ConfigProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
