import React from 'react';
import { Route } from 'react-router-dom';
import { routeNames } from '../../services';
import AssignTags from './assign-tags';
import CheckAddressesSerial from './check-addresses-serial';
import CheckAdressesTcp from './check-addresses-tcp';
import FindDevices from './find-devices';
import SelectModbusOperation from './select-modbus-operation';


export default [
    <Route exact key={routeNames.checkMbAddressesSerial} path={routeNames.checkMbAddressesSerial} component={CheckAddressesSerial} />,
    <Route exact key={routeNames.checkMbAddressesTcp} path={routeNames.checkMbAddressesTcp} component={CheckAdressesTcp} />,
    <Route exact key={routeNames.modbus} path={routeNames.modbus} component={SelectModbusOperation} />,
    <Route exact key={routeNames.assignTags} path={routeNames.assignTags} component={AssignTags} />,
    <Route exact key={routeNames.findDevices} path={routeNames.findDevices} component={FindDevices} />,
]