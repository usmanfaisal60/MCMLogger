import { callback } from ".";

export interface IServerSideSettingStore {
    deviceToken: string;
}

export interface IRegisterDevice {
    picture?: File;
    name: string;
    token: string;
}

export namespace GeneralConfiguration {
    declare type registerDeviceToUserType = (args: IRegisterDevice, cbSuccess: callback, cbFailure: callback) => void;
    interface IServerSideActions {
        registerDeviceToUser: registerDeviceToUserType
    }
}

