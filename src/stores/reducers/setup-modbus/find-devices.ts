import { IAction, IFindDevicesStore } from "../../../types"
import { findDevicesTypes } from "../../reducersTypes";

const INITIAL_STATE: IFindDevicesStore = {
    devices: []
}

const {
    SET_DEVICES_LIST,
    CLEAR_REDUCERS
} = findDevicesTypes;

function findDevicesStore(state: IFindDevicesStore = INITIAL_STATE, action: IAction): IFindDevicesStore {
    switch (action.type) {
        case SET_DEVICES_LIST:
            return { ...state, devices: action.payload }
        case CLEAR_REDUCERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default findDevicesStore;