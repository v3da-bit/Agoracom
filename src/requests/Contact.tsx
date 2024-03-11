import server from "../apis/server";
import { version } from "../apis/constants";

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k=>k.join("=")).join('&')}`
}

export const contact = async (payload: any) => {
    return await server().post(`/api/${version}/contacts`, payload);
};

export const contactRelation = async (payload: any) => {
    return await server().post(`/api/${version}/contact_questions`, payload);
};