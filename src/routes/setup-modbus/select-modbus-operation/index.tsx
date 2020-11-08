import React from 'react';
import { AiOutlineMonitor } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import { colors, routeNames } from '../../../services';
import { SelectionCard } from '../../../components';

const SelectModbusOperation = () => {

    return (
        <div className="w-100 h-100 p-5">
            <div className="row justify-content-center align-items-center pt-5 m-0">
                <SelectionCard path={routeNames.checkMbAddressesSerial} icon={<AiOutlineMonitor size={50} color={colors.grey} />} title="Monitor addresses (Serial)" />
                <SelectionCard path={routeNames.checkMbAddressesTcp} icon={<AiOutlineMonitor size={50} color={colors.grey} />} title="Monitor addresses (TCP)" />
            </div>
            <div className="row justify-content-center align-items-center pt-2 m-0">
                <SelectionCard path={routeNames.assignTags} icon={<FaTags size={50} color={colors.grey} />} title="Assign tags" />
            </div>
        </div>
    )
}

export default SelectModbusOperation;
