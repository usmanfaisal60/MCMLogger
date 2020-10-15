import { AxiosResponse } from "axios";
import { apis, sleep } from "../../../services";
import { callback, DispatcherType, IDevice, IModbusReq } from "../../../types";
import { findDevicesTypes } from "../../reducersTypes";

const {
    SET_DEVICES_LIST
} = findDevicesTypes;

export const scanNetworks = (ip: string, cbSuccess: callback, cbFailure: callback) => async (dispatch: DispatcherType) => {
    try {
        const found: AxiosResponse<IDevice>[] = [];
        const ipPrefixArray = ip.split('.');
        ipPrefixArray.splice(3, 1);
        const ipPrefix = ipPrefixArray.join(".");
        for (let i = 1; i < 250; i++) {
            apis.raw({
                url: `http://${ipPrefix}${i}/ping`,
                method: "GET"
            }).then(res => {
                found.push({ ...res.data, ip: `${ipPrefix}.${i}` });
            }).catch(e => { });
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

export const pingModbus = (args: IModbusReq, cbSuccess: callback, cbFailure: callback) => async (dispatch: DispatcherType) => {
    try {
        // const mbRes = (await apis.pingModbus(args.startingAddress, args.length))?.data;
        const mbRes = await new Promise((res, rej) => setTimeout(() => res(sample()), 100));
        console.log('[MODBUS RESPONSE]', mbRes);
        cbSuccess(mbRes);
    } catch (e) {
        console.log('[ERROR GETTING RESPONSE FORM PING MODBUS]', e, e.response);
        cbFailure();
    }
};

const sample = () => `[40010]                     ${((Math.random() * 20) + 400).toFixed(2)}
[40011]                     ${((Math.random() * 20) + 400).toFixed(2)}
[40012]                     ${((Math.random() * 20) + 400).toFixed(2)}
[40013]                     0.00
[40014]                     0.00
[40015]                     0.00
[40016]                     0.00
[40017]                     0.00
[40018]                     0.00
[40019]                     0.00
[40020]                     0.00
[40021]                     ${((Math.random()) + 3).toFixed(2)}
[40022]                     ${((Math.random()) + 3).toFixed(2)}
[40023]                     ${((Math.random()) + 3).toFixed(2)}
[40024]                     0.00
[40025]                     0.00
[40026]                     0.00
[40027]                     0.00
[40028]                     0.00
[40029]                     0.00
[40030]                     0.00
[40031]                     ${((Math.random() * 0.1) + 1.2).toFixed(2)}
[40032]                     ${((Math.random() * 0.1) + 1.2).toFixed(2)}
[40033]                     ${((Math.random() * 0.1) + 1.2).toFixed(2)}
[40034]                     0.00
[40035]                     0.00
[40036]                     0.00
[40037]                     0.00
[40038]                     0.00
[40039]                     0.00
[40040]                     0.00
`; 