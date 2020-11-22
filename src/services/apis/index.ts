import API from './API';
import { networks, ping, connect, checkLastAttempt, reset, getAllTags, setAllTags } from './mock-jsons';


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
}

export type APITYPE = "GET" | "PUT" | "POST";

export const address = {
    defaultUrl: "http://192.168.0.50",
    // currentUrl: "http://192.168.8.109",
    currentUrl: "",
}