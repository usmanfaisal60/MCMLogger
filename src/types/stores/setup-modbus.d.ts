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
    id: string;
    name: string;
    tagName: string;
    address: string;
    dataType: SetupModbusActions.assignTagDataType;
    commChannel: SetupModbusActions.assignTagCommChannel;
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
    interface IFindDevicesActions {
        scanNetworks: scanNetworksType
    }
    interface ICheckAdressesActions {
        pingModbus: pingModbusType,
        startMonitoring: startMonitoringType,
        stopMonitoring: stopMonitoringType
    }
}