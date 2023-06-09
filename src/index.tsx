import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss'
import App from 'app/AppContainer/App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HashRouter>
            <App></App> 
        </HashRouter>
    </React.StrictMode>
);
