import server from "../apis/server";
import { version } from "../apis/constants";

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k => k.join("=")).join('&')}`
}

export const getSearch = async (value: any) => {
    return await server().get(`/api/${version}/searches?q=${value}`);
}

export const getSearchCompanies = async (value: any) => {
    return await server().get(`api/${version}/searches/companies?q=${value}`);
}