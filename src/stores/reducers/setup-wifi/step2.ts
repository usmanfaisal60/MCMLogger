import { IAction, IStep2Store } from "../../../types"
import { step2Types } from "../../reducersTypes";

const INITIAL_STATE: IStep2Store = {
    device: null,
    tested: false
}

const {
    SET_DEVICE_INFORMATION,
    CLEAR_REDUCERS
} = step2Types;

function step2Store(state: IStep2Store = INITIAL_STATE, action: IAction): IStep2Store {
    switch (action.type) {
        case SET_DEVICE_INFORMATION:
            return { ...state, device: action.payload, tested: true }
        case CLEAR_REDUCERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default step2Store;