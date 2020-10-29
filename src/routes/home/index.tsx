import React from 'react';
import { GiCircuitry } from 'react-icons/gi';
import { FaWifi } from 'react-icons/fa';
import { colors, routeNames } from '../../services';
import { SelectionCard } from '../../components';

const Home = () => {
    return (
        <div className="w-100 h-100 p-5">
            <div className="row justify-content-center align-items-center pt-5 m-0">
                <SelectionCard path={routeNames.findDevices} icon={<GiCircuitry size={50} color={colors.grey} />} title="Setup Modbus" />
                <SelectionCard path={routeNames.connection} icon={<FaWifi size={50} color={colors.grey} />} title="Setup Wifi" />
            </div>
        </div>
    )
}

export default Home;
