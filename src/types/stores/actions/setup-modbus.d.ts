import { IDevice } from "..";

export interface IFindDevicesStore {
    devices: IDevice[];
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
    interface IFindDevicesActions {
        scanNetworks: scanNetworksType
    }
    interface ICheckAdressesActions {
        pingModbus: pingModbusType
    }
}