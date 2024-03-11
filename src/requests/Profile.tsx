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

export const getMemberProfile = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/users/${id}/profile`);
};
export const addRating = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/ratings`, payload)
}
export const getLoggedInProfileDetails = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/users/${id}`);
}

export const getMemberPosts = async (type: string, id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/users/${id}/${type}`, request);
    return await server(options).get(url);
};

export const getMemberFollower = async (id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/users/${id}/followed_members`, request);
    return await server(options).get(url);
};

export const getMemberFollowedHub = async (id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/users/${id}/favorite_hubs`, request);
    return await server(options).get(url);
};

export const getMemberLeadingHub = async (id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/users/${id}/leading_hubs`, request);
    return await server(options).get(url);
};

export const createPrivateMsg = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/private_messages`, payload)
}

export const searchUser = async (value: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/users/search?q=${value}`);
}

export const ViolationPagination = async (item: any, page: any, companyId = 0) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/violations?page=${page}&items=${item}${companyId > 0 ? `&company_id=${companyId}` : ''}`);
}
export const BansPagination = async (item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/bans?page=${page}&items=${item}`);
}
export const ViolationEdit = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/violations/${id}`);
}
export const ModerateMsgPagination = async (payload: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`api/${version}/messages/moderate`, payload);
    return await server(options).get(url);
    // return await server(options).get(`?page=${page}&items=${item}`,payload);
}

export const processViolation = async (id: any, payload: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`api/${version}/violations/${id}`, payload);
    return await server(options).patch(url);
}
// let id=624946
export const UserPagination = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/admin/users`, request);
    return await server(options).get(url);
}
export const CompanyPagination = async (request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/admin/companies`, request);
    return await server(options).get(url);
}

export const UserGetEdit = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`/api/${version}/admin/users/${id}`);
}

export const UserSubmitEdit = async (id: any, payload: any, headers: any) => {
    let options = {
        headers: headers,
    };
    console.log(payload);
    return await server(options).patch(`/api/${version}/users/${id}`, payload);
}
export const UserAuthoritiesPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/users/${id}/authorities?page=${page}&items=${item}`);
}
export const UserActivitiesPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/users/${id}/activities?page=${page}&items=${item}`);
}
export const UserMessagesPagination = async (id: any, payload: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`api/${version}/admin/users/${id}/messages`, payload);
    return await server(options).get(url);
}
export const UserRatingsPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/users/${id}/ratings?page=${page}&items=${item}`);
}

export const DeleteRating = async (ratings: string) => {
    const options = fetchOptions();
    return await server(options).delete(`api/${version}/admin/ratings/purge?rating_ids=[${ratings}]`)
}

export const UserBansPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/users/${id}/bans?page=${page}&items=${item}`);
}
export const CompanyBroadcastPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/companies/${id}/broadcasts?page=${page}&items=${item}`);
}
export const CompanyManagersPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/companies/${id}/managers?page=${page}&items=${item}`);
}
export const CompanyAuthoritiesPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/companies/${id}/authorities?page=${page}&items=${item}`);
}
export const CompanyExecutiveMsgPagination = async (id: any, item: any, page: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/companies/${id}/executive_addresses?page=${page}&items=${item}`);
}
export const CompanyMessagePagination = async (id: any, request: any) => {
    const options = fetchOptions();
    let url = getQueryParams(`/api/${version}/admin/companies/${id}/messages`, request);
    return await server(options).get(url);
}
export const UserAddAdjustment = async (id: any, payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/admin/users/${id}/add_adjustment`, payload)
}
export const UserAddAuthority = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/admin/authorities`, payload)
}
export const UserBan = async (id: any, payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/admin/users/${id}/ban`, payload)
}
export const UserAuthorityVisible = async (id: any, payload: any) => {
    const options = fetchOptions();
    return await server(options).patch(`api/${version}/admin/authorities/${id}`, payload)
}
export const CompanyData = async (id: any) => {
    const options = fetchOptions();
    return await server(options).get(`api/${version}/admin/companies/${id}`);
}
export const DeleteBans = async (id: any, banId: any) => {
    const options = fetchOptions();
    return await server(options).delete(`api/${version}/admin/users/${id}/remove_ban?ban_id=${banId}`)
}
export const AddCompanyExecutiveAddress = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/admin/executive_addresses`, payload)
}
export const UpdateCompanyExecutiveAddress = async (id: any, payload: any) => {
    const options = fetchOptions();
    return await server(options).patch(`api/${version}/admin/executive_addresses/${id}`, payload)
}

export const DeleteExecutiveAddress = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`api/${version}/admin/executive_addresses/${id}`)
}

export const AddCompanyManager = async (payload: any) => {
    const options = fetchOptions();
    if (options.headers) {
        options.headers = {
            ...options.headers,
            "Content-Type": "multipart/form-data"
        }
    }
    else {
        options["headers"] = {
            "Content-Type": "multipart/form-data"
        }
    }
    return await server(options).post(`api/${version}/admin/managers`, payload)
}
export const UpdateCompanyManager = async (id: any, payload: any) => {

    const options = fetchOptions();
    if (options.headers) {
        options.headers = {
            ...options.headers,
            "Content-Type": "multipart/form-data"
        }
    }
    else {
        options["headers"] = {
            "Content-Type": "multipart/form-data"
        }
    }
    return await server(options).patch(`api/${version}/admin/managers/${id}`, payload)
}
export const DeleteManager = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`api/${version}/admin/managers/${id}`)
}
export const CreateUser = async (payload: any) => {
    const options = fetchOptions();
    return await server(options).post(`api/${version}/admin/users`, payload)
}
export const CreateCompany = async (payload: any) => {
    const options = fetchOptions();
    if (options.headers) {
        options.headers = {
            ...options.headers,
            "Content-Type": "multipart/form-data"
        }
    }
    else {
        options["headers"] = {
            "Content-Type": "multipart/form-data"
        }
    }
    return await server(options).post(`api/${version}/admin/companies`, payload)
}
export const UpdateCompany = async (id: any, payload: any) => {
    const options = fetchOptions();
    if (options.headers) {
        options.headers = {
            ...options.headers,
            "Content-Type": "multipart/form-data"
        }
    }
    else {
        options["headers"] = {
            "Content-Type": "multipart/form-data"
        }
    }
    return await server(options).patch(`api/${version}/admin/companies/${id}`, payload)
}
export const getCompanyManager = async (id: any) => {
    const option = fetchOptions()
    return await server(option).get(`api/${version}/admin/managers/${id}`)
}
export const updateEmail = async (payload: any) => {
    const option = fetchOptions()
    return await server(option).patch(`/auth`, payload)
}

export const deleteAuthority = async (ids: any) => {
    const option = fetchOptions();
    return await server(option).delete(`api/${version}/admin/authorities/purge?authority_ids=[${ids.toString()}]`)
}

export const updateModerateMsgBtn = async (payload: any) => {
    const option = fetchOptions()
    return await server(option).patch(`api/${version}/admin/global_settings/update_moderate`, payload)
}

export const getModerateMsgBtn = async () => {
    const option = fetchOptions()
    return await server(option).get(`api/${version}/admin/global_settings/moderate`)
}

export const updateModerateMsgApproved = async (id: any, payload: any) => {
    const option = fetchOptions()
    return await server(option).patch(`api/${version}/messages/${id}/update_approved`, payload)
}
export const getUserInboxData = async (id: any) => {
    const option = fetchOptions()
    return await server(option).get(`api/${version}/private_messages/${id}`)

}
export const deleteUserInboxdata = async (id: any) => {
    const options = fetchOptions();
    return await server(options).delete(`api/${version}/private_messages/${id}`)
}
