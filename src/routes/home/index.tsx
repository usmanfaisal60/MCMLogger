import React from 'react';
import SelectionCard from './selection-card';
import { GiCircuitry } from 'react-icons/gi';
import { FaWifi } from 'react-icons/fa';
import { colors, routeNames } from '../../services';

const Home = () => {
    return (
        <div className="w-100 bg-light h-100 overflow-scroll p-5">
            <div className="row justify-content-center align-items-center p-5 m-0">
                <SelectionCard path={routeNames.findDevices} icon={<GiCircuitry size={50} color={colors.grey} />} title="Setup Modbus" />
                <SelectionCard path={routeNames.connection} icon={<FaWifi size={50} color={colors.grey} />} title="Setup Wifi" />
            </div>
        </div>
    )
}

export default Home;
