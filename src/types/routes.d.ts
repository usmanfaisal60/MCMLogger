import { RouteComponentProps } from "react-router-dom";
import { IDevice, IFindDevicesStore, IStep2Store, IStep3Store } from "./stores";

export interface ISelectionCard {
    icon?: any;
    title?: string;
    path: string;
}

export interface ICenterContentWrapper {
    children: any
}

export interface IStep2 extends IStep2Store {
    getDeviceInformation: (cbSuccess: callback, cbFailure: callback) => void;
    clearStep2Reducers: () => void;
}
export interface IStep3 extends IStep3Store {
    getNetworksList: (cbSuccess: callback, cbFailure: callback) => void;
    resetController: (cbSuccess?: callback, cbFailure?: callback) => void;
    clearStep3Reducers: () => void;
}
export interface IStep4 {
    match?: {
        params?: {
            network?: string
        }
    }
}
export interface IFindDevice extends IFindDevicesStore {
    scanNetworks: (ip: string, cbSuccess: callback, cbFailure: callback) => void;
}
export interface IModbusReq {
    startingAddress: string;
    length: string
}
export interface ICheckAdresses {
    pingModbus: (args: IModbusReq, cbSuccess: callback, cbFailure: callback) => void;
}
export interface IDevicesModal extends RouteComponentProps {
    devices: IDevice[];
    loading: boolean;
    show: boolean;
    setShow: (flag: boolean) => any;
}

export type callback = (arg?: any) => void;