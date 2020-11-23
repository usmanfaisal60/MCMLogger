import axios, { AxiosRequestConfig } from 'axios';
import { address } from '.';
import { memStrings } from '..';

const timeout = 200000;

class BaseApis {
    async get(route: string, data: any, guard: boolean) {
        return await axios.get(
            route + (data ? data : ""),
            {
                headers: guard ? {
                    "Authorization": "Bearer " + localStorage.getItem(memStrings.authToken)
                } : null,
                timeout
            });
    }

    async post(route: string, data: any, guard: boolean) {
        return await axios.post(
            route,
            data,
            {
                headers: guard ? {
                    "Authorization": "Bearer " + localStorage.getItem(memStrings.authToken)
                } : null,
                timeout
            });
    }

    async put(route: string, data: any, guard: boolean) {
        return await axios.put(
            route,
            data,
            {
                headers: guard ? {
                    "Authorization": "Bearer " + localStorage.getItem(memStrings.authToken)
                } : null,
                timeout
            });
    }

    static async sendRawRequest(reqData: AxiosRequestConfig) {
        return await axios(reqData);
    }
}

export default BaseApis;