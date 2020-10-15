import { IAction, IStep3Store } from "../../../types"
import { step3Types } from "../../reducersTypes";

const INITIAL_STATE: IStep3Store = {
    networks: null,
    connected: false
}

const {
    SET_NETWORKS_LIST,
    SET_CONNECTED,
    CLEAR_REDUCERS
} = step3Types;

function step3Store(state: IStep3Store = INITIAL_STATE, action: IAction): IStep3Store {
    switch (action.type) {
        case SET_NETWORKS_LIST:
            return { ...state, networks: action.payload }
        case SET_CONNECTED:
            return { ...state, connected: action.payload }
        case CLEAR_REDUCERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default step3Store;