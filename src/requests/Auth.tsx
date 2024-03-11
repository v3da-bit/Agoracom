import server from "../apis/server";

const getQueryParams = (url: string, req: any) => {
    return `${url}?${Object.entries(req).map(k=>k.join("=")).join('&')}`
}

export const signIn = async (payload: any) => {
    return await server().post("/auth/sign_in", payload);
};

export const signUp = async (payload: any) => {
    return await server().post("/auth", payload);
};

export const forgotPassword = async (payload: any) => {
    return await server().post("/auth/password", payload);
};

export const resetPassword = async (payload: any) => {
    return await server().patch("/auth/password", payload);
};

export const resendConfirmation = async (payload: any) => {
    return await server().post("/auth/confirmation", payload);
};