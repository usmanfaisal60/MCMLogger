import { IDevice } from "..";

export interface IConnectionArgs {
    ssid: string | undefined;
    password: string
}

export interface IStep2Store {
    device: IDevice | null;
    tested?: boolean;
}

export interface IStep3Store {
    networks: {
        name: string,
        strength: number
    }[] | null;
    connected?: boolean;
}

export namespace SetupWifiActions {
    type getDeviceInformationType = (cbSuccess: callback, cbFailure: callback) => void;
    type clearStep2ReducersType = () => void;
    type getNetworksListType = (cbSuccess: callback, cbFailure: callback) => void;
    type resetControllerType = (cbSuccess?: callback, cbFailure?: callback) => void;
    type clearStep3ReducersType = () => void;
    type connectToNetworkType = (args: IConnectionArgs, cbSuccess: callback, cbFailure: callback) => void;

    interface IStep2Actions {
        getDeviceInformation: getDeviceInformationType;
        clearStep2Reducers: clearStep2ReducersType;
    }
    interface IStep3Actions {
        getNetworksList: getNetworksListType;
        resetController: resetControllerType;
        clearStep3Reducers: clearStep3ReducersType;
    }
}