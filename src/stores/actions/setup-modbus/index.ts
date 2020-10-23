import { AxiosResponse } from "axios";
import { apis, makeFormData, sleep } from "../../../services";
import { DispatcherType, IDevice, SetupModbusActions } from "../../../types";
import { findDevicesTypes } from "../../reducersTypes";

const {
    SET_DEVICES_LIST
} = findDevicesTypes;

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
                    method: "GET"
                }).then((res: AxiosResponse<IDevice>) => {
                    found.push({ ...res.data, ip });
                }).catch(e => { });
            })();
        }
        await sleep(5000);
        dispatch({
            type: SET_DEVICES_LIST,
            payload: found
        });
        cbSuccess();
    } catch (e) {
        cbFailure();
    }
}

export const pingModbus: SetupModbusActions.pingModbusType = (args, cbSuccess, cbFailure) => async (dispatch: DispatcherType) => {
    try {
        const mbRes = (await apis.pingModbus(makeFormData(args)))?.data;
        cbSuccess(mbRes);
    } catch (e) {
        console.log('[ERROR GETTING RESPONSE FORM PING MODBUS]', e, e.response);
        cbFailure();
    }
};

