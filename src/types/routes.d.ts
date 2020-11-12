import { RouteComponentProps } from "react-router-dom";
import { IDevice, IFindDevicesStore, IStep2Store, IStep3Store, SetupWifiActions, SetupModbusActions, ICheckAdressesStore } from ".";
import { IAssignTagStore } from "./stores/setup-modbus";

export interface ISelectionCard {
    icon?: any;
    title?: string;
    path: string;
}

export interface ICenterContentWrapper {
    children: any
}

export interface IStep2 extends IStep2Store, SetupWifiActions.IStep2Actions { }
export interface IStep3 extends IStep3Store, SetupWifiActions.IStep3Actions { }
export interface IStep4 { match?: { params?: { network?: string } } }
export interface IFindDevice extends IFindDevicesStore, SetupModbusActions.IFindDevicesActions { }
export interface ICheckAdresses extends ICheckAdressesStore, SetupModbusActions.ICheckAdressesActions { }
export interface IDevicesModal extends RouteComponentProps {
    devices: IDevice[];
    loading: boolean;
    show: boolean;
    setShow: (flag: boolean) => any;
}
export interface ISocketResponse {
    type: string;
    data: string;
}

export interface IAssignTags extends IAssignTagStore, SetupModbusActions.IAssignTagActions { };