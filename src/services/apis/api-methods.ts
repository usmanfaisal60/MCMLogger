import axios, { AxiosRequestConfig } from 'axios';
import { address } from '.';
import { memStrings } from '..';

const timeout = 200000;

class BaseApis {
    async get(route: string, data: any, guard: boolean) {
        return await axios.get(
            (address.currentUrl ? address.currentUrl : address.defaultUrl) + route + (data ? data : ""),
            {
                headers: guard ? {
                    "Authorization": "Bearer " + localStorage.getItem(memStrings.authToken)
                } : null,
                timeout
            });
    }

    async post(route: string, data: any, guard: boolean) {
        return await axios.post(
            (address.currentUrl ? address.currentUrl : address.defaultUrl) + route,
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
            (address.currentUrl ? address.currentUrl : address.defaultUrl) + route,
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