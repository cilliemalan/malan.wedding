import './styles/main.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './App';

const approot = document.getElementById('react-app');

if (environment == 'production') {

    ReactDOM.render(<App />, approot);

} else {
    // i know webpack hot reload auto-ignores on production
    // but the scripts are not included in production env
    const AppContainer = require('react-hot-loader').AppContainer;

    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        approot);

    if (module.hot) {
        console.log('hot reloading active');
        module.hot.accept('./App', () => {
            console.log('doing hot reload');
            const NextApp = require('./App').App;
            ReactDOM.render(
                <AppContainer>
                    <NextApp />
                </AppContainer>,
                approot
            );
        });
    }

}