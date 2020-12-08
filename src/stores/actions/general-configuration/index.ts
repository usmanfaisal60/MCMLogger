import generalConfiguration from "../../../routes/general-configuration";
import { apis, makeFormData } from "../../../services";
import { DispatcherType, GeneralConfiguration } from "../../../types";

export const registerDeviceToUser: GeneralConfiguration.registerDeviceToUserType = (args, cbsucess, cbfailure) => async (dispatch: DispatcherType) => {
    try {
        const { token, user } = (await apis.registerDeviceToUser(args))?.data;
        const deviceToken = (await apis.setDeviceToken({ token }))?.data;
        if (deviceToken.success)
            cbsucess(user);
        else
            cbfailure();
    } catch (e) {
        console.log('[ERROR REGISTERING DEVICE]', e);
        cbfailure();
    }
}

export const setGeneralModbusParams: GeneralConfiguration.setGeneralModbusParamsType = (args, cbsucess, cbfailure) => async (dispatch: DispatcherType) => {
    try {
        const { success } = (await apis.setGeneralModbusParams(makeFormData(args)))?.data;
        if (success)
            cbsucess();
    } catch (e) {
        console.log('[ERROR SETTING GENERAL PARAMETERS]', e);
        cbfailure();
    }
}