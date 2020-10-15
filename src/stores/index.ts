import { combineReducers } from 'redux'
import { IFindDevicesStore, IStep2Store, IStep3Store } from '../types';
import step2 from './reducers/setup-wifi/step2';
import step3 from './reducers/setup-wifi/step3';
import findDevices from './reducers/setup-modbus/find-devices';

export default combineReducers<IRootReducers>({
    step2,
    step3,
    findDevices
});

export interface IRootReducers {
    step2: IStep2Store;
    step3: IStep3Store;
    findDevices: IFindDevicesStore;
}

export type MapStateToPropsType<T> = (state: IRootReducers) => T;