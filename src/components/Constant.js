// export const GET_TXN = id => MOCK_GET_TXN(id);
import LocalStorage from "./LocalStorage";

export const GET_TXN = id => API_URL_GET_TXN(id);
export const POST_TARGET = () => API_URL_POST_TARGET();
export const GET_TARGET = (id) => API_URL_GET_TARGET(id);
export const SET_URL = (url) => {
    API_IN_USE = url;
    LocalStorage.saveAPI(url);
};
export const GET_URL = () => API_IN_USE;

export const KAFKA_URL = "https://esbsit.dfs.com:5555/rest/DFS/demo";
// export const KAFKA_URL = "http://x-sin-edp-p-app-8-s01.dfs:9090/outdo-services/v1";
export const SERVEO_URL = "https://api09.serveo.net/outdo-services/v1";
export const ESB_DFS_URL = "https://esb.dfs.com:5556";
export const API_DFS_URL = "https://api.dfs.com";
export const DEV_API_DFS_URL = "https://dev.api.dfs.com";
export const STAGING_API_DFS_URL = "https://staging.api.dfs.com";

var API_IN_USE = LocalStorage.getAPI() === '' ? KAFKA_URL : LocalStorage.getAPI();
const API_URL_GET_TXN = id => API_IN_USE + "/transactions/" + id;
const API_URL_POST_TARGET = () => API_IN_USE + "/target";
const API_URL_GET_TARGET = id => API_IN_USE + "/target/" + id;

// const HOST = "http://10.176.19.252:8080/";
// const MOCK_GET_TXN = id => HOST + "transactions?id=" + id;
// const MOCK_POST_TARGET = () => HOST + "/target";

export const FORMAT_DATE_LOCALE = (date) => {
    let spacedDate = date.substring(0, 4) + " " + date.substring(4, 6) + " " + date.substring(6, 8);
    return new Date(spacedDate).toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"});
};
export const FORMAT_SHORT_DATE_LOCALE = (date) => {
    let spacedDate = date.substring(0, 4) + " " + date.substring(4, 6) + " " + date.substring(6, 8);
    return new Date(spacedDate).toLocaleDateString('en-US', {day: "numeric", month: "short"});
};
export const FORMAT_DATE = (date) => {
    let spacedDate = date.substring(0, 4) + " " + date.substring(4, 6) + " " + date.substring(6, 8);
    return new Date(spacedDate);
};
export const NOW_DATE_FORMATTED = () => new Date().toLocaleDateString('en-US', {
    day: "numeric",
    month: "short",
    year: "numeric"
});
export const YYYYMMDD = (date) => {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
};

export const storeOptions = new Map();
storeOptions.set("Sydney", [25]);
storeOptions.set("Cairns", [47]);
storeOptions.set("San Francisco", [1010, 1011, 1012, 1013]);