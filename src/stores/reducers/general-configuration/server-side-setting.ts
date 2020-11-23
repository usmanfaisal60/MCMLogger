import { IAction, IServerSideSettingStore } from "../../../types"
import { serverSideSettingTypes } from "../../reducersTypes";

const INITIAL_STATE: IServerSideSettingStore = {
    deviceToken: "",
}

const {
    SET_DEVICE_TOKEN
} = serverSideSettingTypes
function serverSideSetting(state: IServerSideSettingStore = INITIAL_STATE, action: IAction): IServerSideSettingStore {
    switch (action.type) {
        case SET_DEVICE_TOKEN:
            return { ...state, deviceToken: action.payload }
        default:
            return state;
    }
}

export default serverSideSetting;