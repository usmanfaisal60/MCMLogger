import { AxiosResponse } from "axios";
import { address, apis, makeFormData, sleep } from "../../../services";
import { DispatcherType, IAssignTag, IDevice, SetupModbusActions } from "../../../types";
import { findDevicesTypes, checkAddressesTypes, assignTagsTypes } from "../../reducersTypes";

const {
    SET_DEVICES_LIST
} = findDevicesTypes;
const {
    SET_WESOCKET_OBJECT,
    SET_WESOCKET_RESPONSE,
    CLEAR_REDUCERS: CHECKADDRESS_CLEAR_REDUCERS
} = checkAddressesTypes;
const {
    SET_TAGS_OBJECT,
    CLEAR_REDUCERS
} = assignTagsTypes;

export const scanNetworks: SetupModbusActions.scanNetworksType = (ip, cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        const found: IDevice[] = [];
        const ipPrefixArray = ip.split('.');
        ipPrefixArray.splice(3, 1);
        const ipPrefix = ipPrefixArray.join(".");
        for (let i = 1; i < 250; i++) {
            (() => {
                const ip = `${ipPrefix}.${i}`;
                apis.raw({
                    url: `http://${ip}/ping`,
                    method: "GET",
                }).then((res: AxiosResponse<IDevice>) => {
                    found.push({ ...res.data, ip });
                }).catch(e => { });
            })();
        }
        for (let i = 0; found.length === 0 && i < 5; i++)
            await sleep(2500);

        dispatch({
            type: SET_DEVICES_LIST,
            payload: found
        });
        cbSuccess();
    } catch (e) {
        cbFailure();
    }
}

export const startMonitoring: SetupModbusActions.startMonitoringType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    const socket = new WebSocket(`ws://${(address.currentUrl ? address.currentUrl : address.defaultUrl).replace("http://", "")}:81`);
    socket.onmessage = (event: { data: string }) => dispatch({
        type: SET_WESOCKET_RESPONSE,
        payload: JSON.parse(event.data)
    });
    socket.onopen = () => {
        dispatch({
            type: SET_WESOCKET_OBJECT,
            payload: socket
        });
        cbSuccess(socket);
    };
    socket.onerror = cbFailure;
}
export const stopMonitoring: SetupModbusActions.stopMonitoringType = (socket, cbSuccess) => async (dispatch: DispatcherType) => {
    if (socket) socket.close();
    dispatch({
        type: SET_WESOCKET_OBJECT,
        payload: null
    });
    dispatch({
        type: SET_WESOCKET_RESPONSE,
        payload: ""
    });
    cbSuccess();
}

export const getAllTags: SetupModbusActions.getAllTagsType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        const allTags: IAssignTag[] = (await apis.getAllTags())?.data;
        allTags.forEach((el, i) => el.id = i);
        dispatch({
            type: SET_TAGS_OBJECT,
            payload: allTags
        });
        cbSuccess();
    } catch (e) {
        cbFailure();
    }
}

export const setAllTags: SetupModbusActions.setAllTagsType = (args, cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        await apis.setAllTags(makeFormData({ allTags: args }));
        cbSuccess();
    } catch (e) {
        cbFailure();
    }
}
