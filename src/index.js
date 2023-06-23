import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, } from "react-router-dom";
import {I18nextProvider,initReactI18next} from "react-i18next";
import i18next from "i18next";

import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"

i18next
    .use(initReactI18next)
    .init({
    interpolation: {escapeValue: false},
    lng:"es",
    resources:{
        es:{
            global:global_es
        },
        en:{
            global:global_en
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <Router>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>

    </Router>

);
