// export const GET_TXN = id => MOCK_GET_TXN(id);
export const GET_TXN = id => KAFKA_V1_GET_TXN(id);
export const POST_TARGET = () => MOCK_POST_TARGET();
export const GET_TARGET = () => "";
export const FORMAT_DATE = (date) => date.toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"});

const KAFKA_V1_GET_TXN = id => "http://x-sin-edp-p-app-8-s01.dfs:9090/outdo-services/v1/transactions/" + id;
const KAFKA_V1_POST_TXN = () => "http://x-sin-edp-t-edg-8-s01.dfs:9090/outdo-services/v1/target/";


const HOST = "http://10.176.19.252:8080/";
const MOCK_GET_TXN = id => HOST + "transactions?id=" + id;
const MOCK_POST_TARGET = () => HOST + "/target";