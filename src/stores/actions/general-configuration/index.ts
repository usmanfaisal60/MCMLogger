import { apis } from "../../../services";
import { DispatcherType, GeneralConfiguration } from "../../../types";

export const registerDeviceToUser: GeneralConfiguration.registerDeviceToUserType = (args, cbsucess, cbfailure) => async (dispatch: DispatcherType) => {
    try {
        const deviceRegistration = (await apis.registerDeviceToUser(args))?.data;
        cbsucess();
    } catch (e) {
        console.log('[ERROR REGISTERING DEVICE]', e);
        cbfailure();
    }
}