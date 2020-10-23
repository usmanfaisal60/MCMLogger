import API from './API';

export const apis = {
    raw: API.sendRawRequest,
    ping: new API("/ping", "GET", false).sendRequest,
    networks: new API("/networks", "GET", false).sendRequest,
    connect: new API("/connect", "POST", false).sendRequest,
    checkLastAttempt: new API("/checkLastAttempt", "GET", false).sendRequest,
    reset: new API("/reset", "POST", false).sendRequest,
    pingModbus: new API('/pingModbus', "POST", false).sendRequest,
}

export type APITYPE = "GET" | "PUT" | "POST";

export const address = {
    defaultUrl: "http://192.168.0.50",
    currentUrl: "",
}