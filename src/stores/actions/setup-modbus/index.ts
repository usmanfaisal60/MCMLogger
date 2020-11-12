import { AxiosResponse } from "axios";
import { address, apis, sleep } from "../../../services";
import { DispatcherType, IAssignTag, IDevice, SetupModbusActions } from "../../../types";
import { findDevicesTypes, checkAddressesTypes, assignTagsTypes } from "../../reducersTypes";

const {
    SET_DEVICES_LIST
} = findDevicesTypes;
const {
    SET_WESOCKET_OBJECT,
    SET_WESOCKET_RESPONSE
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
    cbSuccess();
}

export const getAllTags: SetupModbusActions.getAllTagsType = (cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        setTimeout(() => {
            dispatch({
                type: SET_TAGS_OBJECT,
                payload: tempTags.map((el, i) => ({ ...el, id: i }))
            });
            cbSuccess();
        }, 2000);
    } catch (e) {
        cbFailure();
    }
}


const tempTags: IAssignTag[] = [
    { id: 40002, name: "Phase 1 current", tagName: "Ia", address: "40002", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [{ trigger: "GT", value: 10 }] },
    { id: 40004, name: "Phase 2 current", tagName: "Ib", address: "40004", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [] },
    { id: 40006, name: "Phase 3 current", tagName: "Ic", address: "40006", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [] },
    { id: 40012, name: "Phase 1 voltage", tagName: "Ua", address: "40012", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [] },
    { id: 40014, name: "Phase 2 voltage", tagName: "Ub", address: "40014", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [] },
    { id: 40016, name: "Phase 3 voltage", tagName: "Uc", address: "40016", dataType: "32BIT", commChannel: "SERIAL", notificationAction: [] },
]