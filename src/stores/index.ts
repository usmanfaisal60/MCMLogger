import { combineReducers } from 'redux'
import { IAssignTagStore, ICheckAdressesStore, IFindDevicesStore, IStep2Store, IStep3Store } from '../types';
import step2 from './reducers/setup-wifi/step2';
import step3 from './reducers/setup-wifi/step3';
import findDevices from './reducers/setup-modbus/find-devices';
import checkAddresses from './reducers/setup-modbus/check-addresses';
import assignTags from './reducers/setup-modbus/assign-tags';

export default combineReducers<IRootReducers>({
    step2,
    step3,
    findDevices,
    checkAddresses,
    assignTags
});

export interface IRootReducers {
    step2: IStep2Store;
    step3: IStep3Store;
    findDevices: IFindDevicesStore;
    checkAddresses: ICheckAdressesStore;
    assignTags: IAssignTagStore;
}

export type MapStateToPropsType<T> = (state: IRootReducers) => T;