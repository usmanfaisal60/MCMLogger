import React from 'react';
import { Route } from 'react-router-dom';
import { routeNames } from '../../services';
import FindDevices from './find-devices';
import GeneralMBSetting from './general-modbus-setting';
import SelectionScreen from './selection-screen';
import ServerSideSettings from './server-side-setting';

export default [
    <Route exact key={routeNames.findDevices} path={routeNames.findDevices} component={FindDevices} />,
    <Route exact key={routeNames.configSelection} path={routeNames.configSelection} component={SelectionScreen} />,
    <Route exact key={routeNames.configureServer} path={routeNames.configureServer} component={ServerSideSettings} />,
    <Route exact key={routeNames.configureModbus} path={routeNames.configureModbus} component={GeneralMBSetting} />,
];