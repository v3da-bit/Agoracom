import server from "../apis/server";
import { version } from "../apis/constants";

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k=>k.join("=")).join('&')}`
}

export const successStories = async (request: any) => {
    let url = getQueryParams(`/api/${version}/success_stories`, request);
    return await server().get(url);
};

export const newHub = async (payload: any) => {
    return await server().post(`/api/${version}/company_requests`, payload);
};

export const getAllClients = async () => {
    return await server().get(`/api/${version}/companies/clients`);
};