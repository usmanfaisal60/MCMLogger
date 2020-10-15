export interface IAction {
    type: string;
    payload?: any;
}
export interface IStep2Store {
    device: IDevice | null;
    tested?: boolean;
}
export interface IStep3Store {
    networks: {
        name: string,
        strength: number
    }[] | null;
    connected?: boolean;
}
export interface IFindDevicesStore {
    devices: IDevice[];
}
export interface IConnectionArgs {
    ssid: string | undefined;
    password: string
}


export type DispatcherType = (action: IAction) => void;
export interface IDevice {
    success: boolean;
    name: string;
    ip?: string;
}