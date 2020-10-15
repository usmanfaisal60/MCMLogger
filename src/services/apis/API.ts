import { APITYPE } from ".";
import BaseApis from "./api-methods";

class API extends BaseApis implements IAPIClass {
    route: string;
    type: APITYPE;
    guard: boolean;
    data?: any;
    mock?: any;
    constructor(route: string, type: APITYPE, guard: boolean, mock?: any) {
        super();
        this.route = route;
        this.type = type;
        this.guard = guard;
        this.mock = mock;
    }
    sendRequest = async (data?: any) => {
        switch (this.type) {
            case "GET":
                return await this.get(this.route, data, this.guard);
            case "POST":
                return await this.post(this.route, data, this.guard);
            case "PUT":
                return await this.put(this.route, data, this.guard);
            default:
                break;
        }
    }
}

export default API;

interface IAPIClass {
    route: string,
    type: APITYPE,
    guard: boolean,
    data?: any,
    mock?: any,
    sendRequest: (data?: any) => Promise<{ data: any } | undefined>;
}
