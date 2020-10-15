import { apis, makeFormData, sleep } from "../../../services";
import { DispatcherType, IAction, IConnectionArgs } from "../../../types";
import { callback } from "../../../types";
import { step2Types, step3Types } from "../../reducersTypes";

const {
    SET_DEVICE_INFORMATION,
    CLEAR_REDUCERS: CLEAR_REDUCERS2
} = step2Types;
const {
    SET_NETWORKS_LIST,
    CLEAR_REDUCERS: CLEAR_REDUCERS3
} = step3Types;

export const getDeviceInformation = (cbSuccess: callback, cbFailure: callback) => async (dispatch: DispatcherType) => {
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

export const getNetworksList = (cbSuccess: callback, cbFailure: callback) => async (dispatch: DispatcherType) => {
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

export const resetController = (cbSuccess?: callback, cbFailure?: callback) => async (dispatch: DispatcherType) => {
    try {
        await apis.reset();
    } catch (e) {
        console.log('[ERROR RESETTING CONTROLLER]', e, e.response);
    }
}

export const connectToNetwork = (args: IConnectionArgs, cbSuccess: callback, cbFailure: callback) => async (dispatch: DispatcherType) => {
    try {
        apis.connect(makeFormData(args));
        await sleep(30000);
        const check = (await apis.checkLastAttempt())?.data;
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

export const clearStep2Reducers = (): IAction => ({
    type: CLEAR_REDUCERS2,
});

export const clearStep3Reducers = (): IAction => ({
    type: CLEAR_REDUCERS3,
});