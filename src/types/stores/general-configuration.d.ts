import { callback } from ".";

export interface IServerSideSettingStore {
    deviceToken: string;
}

export interface IGeneralMBSetting {
    address: string;
    baud: string;
}

export interface IRegisterDevice {
    picture?: File;
    name: string;
    token: string;
}

export namespace GeneralConfiguration {
    declare type registerDeviceToUserType = (args: IRegisterDevice, cbSuccess: callback, cbFailure: callback) => void;
    declare type setGeneralModbusParamsType = (args: IGeneralMBSetting, cbSuccess: callback, cbFailure: callback) => void;
    interface IServerSideActions {
        registerDeviceToUser: registerDeviceToUserType
    }
    interface IGeneralMBSettingActions {
        setGeneralModbusParams: setGeneralModbusParamsType
    }
}

