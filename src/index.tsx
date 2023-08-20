import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {Provider} from "react-redux";
import store from "./app/store/store";
import {createGlobalStyle} from "styled-components";
import {BrowserRouter} from "react-router-dom";


const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GlobalStyles/>
            <App/>
        </BrowserRouter>
    </Provider>
);

