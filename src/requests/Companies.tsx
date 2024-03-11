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

export const companyDetails = async () => {
    return await server().get(`/api/${version}/companies`);
};

export const companyInfo = async (id: any, headers: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/companies/${id}`);
};

export const getPostById = async (id: any, headers: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/messages/${id}/edit`);
}

export const createPost = async (payload: any, headers: any) => {
    let options = {
        headers: headers,
    };
    return await server(options).post(`/api/${version}/messages`, payload);
}

// export const getMoreSponsor = async (ids: any,payload:any) => {
//     console.log(ids);
//     let url = getQueryParams(`/api/${version}/companies/sponsored?ignore_ids=[${ids.toString()}]`,payload);

//     return await server().get(url)
// }

export const getMoreSponsor = async (payload: any) => {
    console.log(payload.ignore_ids);
    // if(payload.ignore_ids){
    //     payload.ignore_ids.toString()
    // }

    let url = getQueryParams(`/api/${version}/companies/sponsored`, payload);

    return await server().get(url)
}

export const getMoreUnsponsor = async (request: any) => {
    let url = getQueryParams(`/api/${version}/companies/unsponsored`, request);
    return await server().get(url);
}

export const getDiscussion = async (id: any, request: any, type: any = 'discussions') => {
    let url = getQueryParams(`api/${version}/companies/${id}/${type}`, request)
    return await server().get(url);
};

export const getBulletins = async (id: any, request: any) => {
    let url = getQueryParams(`api/${version}/companies/${id}/bulletins`, request)
    return await server().get(url);
};

export const getMembers = async (id: any, request: any) => {
    let url = getQueryParams(`api/${version}/companies/${id}/top_members`, request)
    return await server().get(url);
};

export const getResearch = async (id: any) => {
    return await server().get(`/api/${version}/companies/${id}/research`);
}
export const getCatalogs = async (id: any) => {
    return await server().get(`/api/${version}/companies/${id}/catalogs`);
}

export const getPressRelease = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/press_releases`, request)
    return await server().get(url);
}

export const getComapnyPhotos = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/photos`, request)
    return await server().get(url);
}

export const getComapnyVideos = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/videos`, request)
    return await server().get(url);
}

export const getManagersResearch = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/managers`, request)
    return await server().get(url);
}

export const getCompanyLinksResearch = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/web_links`, request)
    return await server().get(url);
}

export const getCompanyLinkLibrary = async (id: any) => {
    return await server().get(`/api/${version}/companies/${id}/links_library`);
}

export const getMoreLinks = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/no_dd_web_links`, request)
    return await server().get(url);
}

export const getQnA = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/q_and_a`, request)
    return await server().get(url);
}

export const getCompanyNews = async (id: any, request: any) => {
    let url = getQueryParams(`/api/${version}/companies/${id}/news`, request)
    return await server().get(url);
}

export const followMessage = async (id: any, isFollow = false) => {
    let url = `/api/${version}/messages/${id}/${isFollow ? 'follow' : 'unfollow'}`
    if (isFollow) {
        const options = fetchOptions();
        return await server(options).post(url);
    } else {
        const options = fetchOptions();
        return await server(options).delete(url);
    }
}

export const likeMessage = async (id: any, isLike = false) => {
    let url = `/api/${version}/messages/${id}/${isLike ? 'like' : 'unlike'}`
    if (isLike) {
        const options = fetchOptions();
        return await server(options).post(url);
    } else {
        const options = fetchOptions();
        return await server(options).delete(url);
    }
}

export const deletePost = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`api/v1/messages/${id}`);
}

export const restoreCompanyPost = async (id: any) => {
    const options = fetchOptions();
    return await server(options).patch(`api/v1/messages/${id}/unremove`);
}

export const companyViolations = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`/api/v1/violations`, payload);
}

export const updatePost = async (id: any, payload: any, headers: any) => {
    let options = {
        headers: headers,
    };
    return await server(options).patch(`/api/v1/messages/${id}`, payload);
}

export const updateCompany = async (id: any, payload: any, headers: any) => {
    let options = {
        headers: headers,
    };
    return await server(options).patch(`/api/v1/companies/${id}`, payload);
}

export const getInboxData = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/v1/users/${id}/inbox`);
}

export const getSentData = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/v1/users/${id}/sent_messages`);
}

export const getIgnoreData = async (id: any, params: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`api/v1/users/${id}/ignore_list`, params);
    return await server(options).get(url);
}

export const addCommentMsg = async (payload: any) => {
    console.log(payload);
    const options = fetchOptions();
    return await server(options).post(`/api/${version}/messages`, payload);
}

export const deleteMsg = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`/api/${version}/private_messages/${id}`);
}

export const fetchDicussionThread = async (id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/companies/${id}/discussions_threads`, request);
    return await server(options).get(url);
}