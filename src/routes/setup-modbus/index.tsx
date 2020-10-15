import React from 'react';
import { Route } from 'react-router-dom';
import { routeNames } from '../../services';
import CheckAdresses from './check-addresses';
import FindDevices from './find-devices';

export default [
    <Route key={routeNames.checkMbAddresses} path={routeNames.checkMbAddresses} component={CheckAdresses} />,
    <Route key={routeNames.findDevices} path={routeNames.findDevices} component={FindDevices} />,
]