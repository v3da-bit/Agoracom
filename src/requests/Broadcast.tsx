// api/v1

import server from "../apis/server";
import { version } from "../apis/constants";

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k=>k.join("=")).join('&')}`
}

export const broadcastDetails = async () => {
    return await server().get(`/api/${version}/broadcasts/landing`);
};

export const getMoreRecentVideos = async (request: any) => {
    let url = getQueryParams(`/api/${version}/messages/broadcasts`, request);
    return await server().get(url);
}

export const getMoreVideos = async (request: any) => {
    let url = getQueryParams(`/api/${version}/broadcasts`, request);
    return await server().get(url);
}

// export const getMoreUnsponsor = async (request: any) => {
//     let url = getQueryParams(`/api/${version}/companies/unsponsored`, request);
//     return await server().get(url);
// }