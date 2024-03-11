import server from "../apis/server";
import { version } from "../apis/constants";

const fetchOptions = () => {
    let auth: any = null;
    if (typeof window !== 'undefined') {
        let storage: any = localStorage.getItem('persist:reducer');
        auth = JSON.parse(storage)?.auth;
    }

    let options: any = {}
    const parsedData: any = JSON.parse(auth);
    if (parsedData && parsedData.currentUser) {
        const headers = {
            'access-token': parsedData?.currentUser?.accessToken,
            'client': parsedData?.currentUser?.client,
            'uid': parsedData?.currentUser?.uid
        }
        options["headers"] = headers;
    }
    return options;
}

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k => k.join("=")).join('&')}`
}

export const homeDetails = async () => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/home`);
};

export const getCompanies = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/companies/${id}/profile`);
}

export const getCompanyMessages = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/messages/${id}`);
}

export const getMoreCompanies = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/companies/top_companies`, request);
    return await server(options).get(url);
}

export const getMoreMembers = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/users/top_members`, request);
    return await server(options).get(url);
}

export const followMember = async (id: any) => {
    const options = fetchOptions();
    return await server(options).post(`/api/${version}/users/${id}/follow`);
};
export const checkFollowMember = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/users/${id}/follow`);
};

export const unfollowMember = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`/api/${version}/users/${id}/unfollow`);
};

export const addFavouriteCompany = async (id: any) => {
    const options = fetchOptions();
    return await server(options).post(`/api/${version}/companies/${id}/favorite`);
}

export const removeFavouriteCompany = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`/api/${version}/companies/${id}/remove_favorite`);
}

export const getMorePosts = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/messages/featured_posts`, request);
    return await server(options).get(url);
}

export const getMoreNews = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/messages/small_cap_news_tv`, request);
    return await server(options).get(url);
}

export const getMoreSmallCap = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/messages/small_cap60`, request);
    return await server(options).get(url);
}

export const getMoreDiscussions = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/messages/discussions`, request);
    return await server(options).get(url);
}

export const getMoreIndustries = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/messages/industry_bulletin`, request);
    return await server(options).get(url);
}
export const getUnseenMsg = async (user: any) => {
    const options = {
        headers: {
            'access-token': user?.accessToken,
            'client': user?.client,
            'uid': user?.uid
        }
    }
    return await server(options).get(`api/${version}/private_messages/unread`);
}