import React from 'react';
import { Route } from 'react-router-dom';
import { routeNames } from '../../services';
import AssignTags from './assign-tags';
import CheckAdresses from './check-addresses';
import FindDevices from './find-devices';
import SelectModbusOperation from './select-modbus-operation';


export default [
    <Route exact key={routeNames.checkMbAddresses} path={routeNames.checkMbAddresses} component={CheckAdresses} />,
    <Route exact key={routeNames.modbus} path={routeNames.modbus} component={SelectModbusOperation} />,
    <Route exact key={routeNames.assignTags} path={routeNames.assignTags} component={AssignTags} />,
    <Route exact key={routeNames.findDevices} path={routeNames.findDevices} component={FindDevices} />,
]