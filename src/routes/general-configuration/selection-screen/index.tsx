import React from 'react';
import { colors, routeNames } from '../../../services';
import { BackHeaderWrapper, SelectionCard } from '../../../components';
import { MdSettingsInputAntenna, MdSettingsInputSvideo } from 'react-icons/md';

const SelectionScreen = () => {
    return (
        <BackHeaderWrapper>
            <div className="w-100 h-100 p-5">
                <div className="row justify-content-center align-items-center pt-4 m-0">
                    <SelectionCard path={routeNames.configureModbus} icon={<MdSettingsInputSvideo size={50} color={colors.grey} />} title="General Modbus Settings" />
                    <SelectionCard path={routeNames.configureServer} icon={<MdSettingsInputAntenna size={50} color={colors.grey} />} title="Server side setup" />
                </div>
                <div className="row justify-content-center align-items-center m-0">

                </div>
            </div>
        </BackHeaderWrapper>
    )
}

export default SelectionScreen;
