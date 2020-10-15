import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { routeNames } from '../services';
import Home from './home';
import setupWifi from './setup-wifi';
import setupModbus from './setup-modbus';

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                {setupWifi}
                {setupModbus}
                <Route path={routeNames.home} component={Home} />
            </Switch>
        </HashRouter>
    );
}

export default Routes;
