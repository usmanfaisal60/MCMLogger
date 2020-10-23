export interface IAction {
    type: string;
    payload?: any;
}

export type DispatcherType = (action: IAction) => void;

export interface IDevice {
    success: boolean;
    name: string;
    ip?: string;
}

export type callback = (arg?: any) => void;