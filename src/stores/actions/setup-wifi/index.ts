import { apis, makeFormData, sleep } from "../../../services";
import { DispatcherType, IAction, SetupWifiActions } from "../../../types";
import { step2Types, step3Types } from "../../reducersTypes";

const {
    SET_DEVICE_INFORMATION,
    CLEAR_REDUCERS: CLEAR_REDUCERS2
} = step2Types;
const {
    SET_NETWORKS_LIST,
    CLEAR_REDUCERS: CLEAR_REDUCERS3
} = step3Types;

export const getDeviceInformation: SetupWifiActions.getDeviceInformationType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        const device = (await apis.ping())?.data;
        console.log(device);
        dispatch({
            type: SET_DEVICE_INFORMATION,
            payload: device
        });
        cbSuccess();
    } catch (e) {
        console.log('[ERROR GETITNG PING RESPONSE]', e, e.response);
        cbFailure();
    }
}

export const getNetworksList: SetupWifiActions.getNetworksListType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        dispatch({
            type: SET_NETWORKS_LIST,
            payload: null
        });
        const networks = (await apis.networks())?.data;
        console.log(networks);
        dispatch({
            type: SET_NETWORKS_LIST,
            payload: networks
        });
        cbSuccess();
    } catch (e) {
        console.log('[ERROR GETITNG NETWORK LIST]', e, e.response);
        cbFailure();
    }
}

export const resetController: SetupWifiActions.resetControllerType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        await apis.reset();
    } catch (e) {
        console.log('[ERROR RESETTING CONTROLLER]', e, e.response);
    }
}

export const connectToNetwork: SetupWifiActions.connectToNetworkType = (args, cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        apis.connect(makeFormData(args));
        let check = { success: false };
        for (let i = 0; i < 5; i++) {
            await sleep(5000);
            check = (await apis.checkLastAttempt())?.data;
            if (check.success) break;
        }
        console.log(check);
        if (check?.success)
            cbSuccess();
        else
            cbFailure();
    } catch (e) {
        console.log('[ERROR CONNECTING TO THE NETWORK]', e, e.response);
        cbFailure();
    }
}

export const clearStep2Reducers: SetupWifiActions.clearStep2ReducersType = (): IAction => ({
    type: CLEAR_REDUCERS2,
});

export const clearStep3Reducers: SetupWifiActions.clearStep3ReducersType = (): IAction => ({
    type: CLEAR_REDUCERS3,
});