import { SetupModbusActions } from "../../../types"

export const tagOptions: ITagOptions[] = [
    { label: "Phase 1 current", value: "Ia" },
    { label: "Phase 2 current", value: "Ib" },
    { label: "Phase 3 current", value: "Ic" },
    { label: "Phase 1 voltage", value: "Ua" },
    { label: "Phase 2 voltage", value: "Ub" },
    { label: "Phase 3 voltage", value: "Uc" },
    { label: "Phase 1 power", value: "Pa" },
    { label: "Phase 2 power", value: "Pb" },
    { label: "Phase 3 power", value: "Pc" },
    { label: "Phase 1 power factor", value: "PFa" },
    { label: "Phase 2 power factor", value: "PFb" },
    { label: "Phase 3 power factor", value: "PFc" },
]

export const tagDataTypesOptions: ITagDataTypes[] = [
    { label: "16 bit signed integer", value: "16BIT" },
    { label: "32 bit float", value: "32BIT" },
]

export const tagCommChannelOptions: ITagCommChannel[] = [
    { label: "Serial communication", value: "SERIAL" },
    { label: "Modbus tcp communication", value: "TCP" },
]

export const triggerOptions: ITriggerOptions[] = [
    { label: "Greater than", value: "GT" },
    { label: "Equal to", value: "EQ" },
    { label: "Less than", value: "LT" }
]

export interface ITagOptions {
    label: string;
    value: string;
}
export interface ITagDataTypes {
    label: string;
    value: SetupModbusActions.assignTagDataType;
}
export interface ITagCommChannel {
    label: string;
    value: SetupModbusActions.assignTagCommChannel;
}

export interface ITriggerOptions {
    label: string;
    value: SetupModbusActions.notificationTriggersType;
}