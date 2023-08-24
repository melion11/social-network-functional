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
    overflow-x: hidden;
  }
  
  body::-webkit-scrollbar {
    width: 3px;
  }

  body::-webkit-scrollbar-track {
    background-color: #606060;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #c26604;
  }
`;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <GlobalStyles/>
            <App/>
        </BrowserRouter>
    </Provider>
);

