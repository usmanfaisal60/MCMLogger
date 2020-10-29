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
export namespace SetupModbusActions {
    type scanNetworksType = (ip: string, cbSuccess: callback, cbFailure: callback) => void;
    type pingModbusType = (args: IModbusReq, cbSuccess: callback, cbFailure: callback) => void;
    type startMonitoringType = (cbSuccess: callback, cbFailure: callback) => void;
    type stopMonitoringType = (socket: WebSocket | null, cbSuccess: callback) => void;
    interface IFindDevicesActions {
        scanNetworks: scanNetworksType
    }
    interface ICheckAdressesActions {
        pingModbus: pingModbusType,
        startMonitoring: startMonitoringType,
        stopMonitoring: stopMonitoringType
    }
}