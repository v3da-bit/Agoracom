import axios from "axios";
import { API_URL } from "./constants";
import { store } from "../redux/ConfigureStore";
import { logout } from "@/redux/User/Action";
import alertMessage from "@/utils/swalAlert";

console.log(store.getState());

const url = API_URL;

let axiosResponse = null;

const apiServer = (options = {}) => {
  const { headers, bufferResponse } = options || {};
  let object = {
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  };
  if (bufferResponse) {
    object["responseType"] = "arraybuffer";
  }
  axiosResponse = axios.create(object);

  axiosResponse.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
      if (err?.response?.status === 401 && !err.request.responseURL.includes('auth')        ) {
        store.dispatch(logout())
        alertMessage({
          title: 'Session expired',
          text: '',
          icon: 'error'
        })
        window.location.replace(window.location.origin + '/auth/login?callback=' + window.location.pathname);
      }
      return Promise.reject(err);
    }
  );
  return axiosResponse;
};

export default apiServer;
