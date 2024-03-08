import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// if port is given in origin, assume it's local dev env, and replace app port with api port
const baseURL = window.location.origin.replace(/:\d+/, ':8001');

export const apiBaseURL = baseURL + '/api';

export const api = axios.create({
  baseURL: apiBaseURL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withXSRFToken: true,
  withCredentials: true,
});

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
