// export const GET_TXN = id => MOCK_GET_TXN(id);
export const GET_TXN = id => KAFKA_V1_GET_TXN(id);
export const POST_TARGET = () => KAFKA_V1_POST_TARGET();
export const GET_TARGET = (id) => KAFKA_V1_GET_TARGET(id);
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

const KAFKA_V1_GET_TXN = id => "http://x-sin-edp-p-app-8-s01.dfs:9090/outdo-services/v1/transactions/" + id;
const KAFKA_V1_POST_TARGET = () => "http://x-sin-edp-p-app-8-s01.dfs:9090/outdo-services/v1/target/";
const KAFKA_V1_GET_TARGET = id => "http://x-sin-edp-p-app-8-s01.dfs:9090/outdo-services/v1/target/" + id;


// const HOST = "http://10.176.19.252:8080/";
// const MOCK_GET_TXN = id => HOST + "transactions?id=" + id;
// const MOCK_POST_TARGET = () => HOST + "/target";