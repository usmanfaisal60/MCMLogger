import { IDevice, callback } from "..";
import { ISocketResponse } from "../..";

export interface IFindDevicesStore {
    devices: IDevice[];
}

export interface ICheckAdressesStore {
    socket: WebSocket | null;
    socketResponse: ISocketResponse | undefined;
}
export interface IModbusReq {
    startAddress: string;
    length: string;
    slaveId?: string;
    baudRate?: number | undefined;
    resType?: number | undefined;
}
export interface IAssignTag {
    id: number;
    name: string;
    tagName: string;
    address: string;
    dataType: SetupModbusActions.assignTagDataType;
    commChannel: SetupModbusActions.assignTagCommChannel;
    notificationAction: {
        trigger: SetupModbusActions.notificationTriggersType;
        value: number
    }[]
}
export interface IAssignTagStore {
    allTags: IAssignTag[];
}

export namespace SetupModbusActions {
    type scanNetworksType = (ip: string, cbSuccess: callback, cbFailure: callback) => void;
    type pingModbusType = (args: IModbusReq, cbSuccess: callback, cbFailure: callback) => void;
    type startMonitoringType = (cbSuccess: callback, cbFailure: callback) => void;
    type stopMonitoringType = (socket: WebSocket | null, cbSuccess: callback) => void;
    type assignTagDataType = "16BIT" | "32BIT";
    type assignTagCommChannel = "SERIAL" | "TCP";
    type notificationTriggersType = "GT" | "EQ" | "LT" | string;
    type getAllTagsType = (cbSuccess: callback, cbFailure: callback) => void;
    type setAllTagsType = (args: string, cbSuccess: callback, cbFailure: callback) => void;
    interface IFindDevicesActions {
        scanNetworks: scanNetworksType
    }
    interface ICheckAdressesActions {
        pingModbus: pingModbusType,
        startMonitoring: startMonitoringType,
        stopMonitoring: stopMonitoringType
    }
    interface IAssignTagActions {
        getAllTags: getAllTagsType;
        setAllTags: setAllTagsType;
    }
}