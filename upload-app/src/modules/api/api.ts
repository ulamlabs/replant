import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const baseURL = window.location.origin.includes('localhost')
  ? 'http://localhost:8001'
  : window.location.origin;

export const apiBaseURL = baseURL + '/api';

// difference between axios instances api and apiRaw is that the latter does not use a generic handle to catch 401 and redirect to /login page
// and can be used when the aforementioned behaviour is not desired.
export const apiRaw = axios.create({
  baseURL: apiBaseURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withXSRFToken: true,
  withCredentials: true,
});

export const api = axios.create({
  baseURL: apiBaseURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withXSRFToken: true,
  withCredentials: true,
});

api.interceptors.response.use(undefined, errorsHandler);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorsHandler(error: any) {
  // if (error.response?.status === 401) {
  //   window.dispatchEvent(new CustomEvent('Replant:unauthorized'));
  // }

  return Promise.reject(error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function patch<TResponseData = any, TPayload = any>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.patch<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(url, payload, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function post<TResponseData = any, TPayload = any>(
  url: string,
  payload?: TPayload,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.post<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(url, payload, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<TResponseData = any, TPayload = any>(
  url: string,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.get<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(url, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function remove<TResponseData = any, TPayload = any>(
  url: string,
  config?: AxiosRequestConfig<TPayload>
) {
  return api.delete<
    TResponseData,
    AxiosResponse<TResponseData, TPayload>,
    TPayload
  >(url, config);
}
