import API from './API';
import { networks, ping, connect, checkLastAttempt, reset, getAllTags, setAllTags, registerDeviceToUser, setDeviceToken, setGeneralModbusParams } from './mock-jsons';

export const address = {
    defaultUrl: "http://192.168.0.50",
    currentUrl: "http://192.168.0.101",
    serverUrl: "http://localhost:3000/api/v1",
    // serverUrl: "http://192.168.0.108:3000/api/v1"
}

export const apis = {
    raw: API.sendRawRequest,
    ping: new API("/ping", "GET", false, ping).sendRequest,
    networks: new API("/networks", "GET", false, networks).sendRequest,
    connect: new API("/connect", "POST", false, connect).sendRequest,
    checkLastAttempt: new API("/checkLastAttempt", "GET", false, checkLastAttempt).sendRequest,
    reset: new API("/reset", "POST", false, reset).sendRequest,
    pingModbus: new API('/pingModbus', "POST", false).sendRequest,
    getAllTags: new API('/getAllTags', "GET", false, getAllTags).sendRequest,
    setAllTags: new API('/setAllTags', "POST", false, setAllTags).sendRequest,
    registerDeviceToUser: new API(address.serverUrl + "/device/register-device", "POST", false, registerDeviceToUser).sendRequest,
    setDeviceToken: new API('/configureDevice', "POST", false, setDeviceToken).sendRequest,
    setGeneralModbusParams: new API('/setGeneralModbusParams', "POST", false, setGeneralModbusParams).sendRequest,
}

export type APITYPE = "GET" | "PUT" | "POST";