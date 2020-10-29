import { IAction, ICheckAdressesStore } from "../../../types"
import { checkAddressesTypes } from "../../reducersTypes";

const INITIAL_STATE: ICheckAdressesStore = {
    socket: null,
    socketResponse: undefined,
}

const {
    SET_WESOCKET_OBJECT,
    CLEAR_REDUCERS,
    SET_WESOCKET_RESPONSE
} = checkAddressesTypes;

function checkAddressesStore(state: ICheckAdressesStore = INITIAL_STATE, action: IAction): ICheckAdressesStore {
    switch (action.type) {
        case SET_WESOCKET_OBJECT:
            return { ...state, socket: action.payload }
        case SET_WESOCKET_RESPONSE:
            return { ...state, socketResponse: action.payload }
        case CLEAR_REDUCERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default checkAddressesStore;