import { IAction, IAssignTagStore } from "../../../types"
import { assignTagsTypes } from "../../reducersTypes";

const INITIAL_STATE: IAssignTagStore = {
    allTags: []
}

const {
    SET_TAGS_OBJECT,
    CLEAR_REDUCERS
} = assignTagsTypes;

function findDevicesStore(state: IAssignTagStore = INITIAL_STATE, action: IAction): IAssignTagStore {
    switch (action.type) {
        case SET_TAGS_OBJECT:
            return { ...state, allTags: action.payload };
        case CLEAR_REDUCERS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default findDevicesStore;