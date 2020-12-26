import React from 'react';
import { GiBigGear, GiCircuitry } from 'react-icons/gi';
import { FaWarehouse, FaWifi } from 'react-icons/fa';
import { address, colors, routeNames } from '../../services';
import { SelectionCard } from '../../components';

const Home = () => {
    return (
        <div className="w-100 h-100 p-5">
            <div className="row justify-content-center align-items-center pt-4 m-0">
                <SelectionCard path={address.currentUrl ? routeNames.modbus : (routeNames.findDevices.replace(":toPath", routeNames.modbus.split("/").join("\\")))} icon={<GiCircuitry size={50} color={colors.grey} />} title="Setup Modbus" />
                <SelectionCard path={routeNames.connection} icon={<FaWifi size={50} color={colors.grey} />} title="Setup Wifi" />
            </div>
            <div className="row justify-content-center align-items-center m-0">
                <SelectionCard path={address.currentUrl ? routeNames.configSelection : (routeNames.findDevices.replace(":toPath", routeNames.configSelection.split("/").join("\\")))} icon={<GiBigGear size={50} color={colors.grey} />} title="Configuration" />
            </div>
        </div>
    )
}

export default Home;
