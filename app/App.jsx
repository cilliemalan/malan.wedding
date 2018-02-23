import React from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

const formRoutes = Object.keys(forms);

export function App(props) {
    return <BrowserRouter>
        <div>
            <div id="mainContent">
                <Switch>
                    <Route exact path="/" render={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </div>
    </BrowserRouter>;
}