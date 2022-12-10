import axios from 'axios';
import axiosCache from 'axios-cache-adapter';
import { lang } from './searchConst';
const { setupCache } = axiosCache;

const axiosParams = {
  baseURL: '',

  params: {
    lang,
  }
};

export const apiClient = axios.create(axiosParams);
``
export const apiCache = setupCache({
  maxAge: 15 * 60 * 1000,
  // Cache exclusion rules
  exclude: {
    // Store responses from requests with query parameters in cache
    query: false
  }
});


export const apiClientCached = axios.create({
  ...axiosParams,
  // adapter: apiCache.adapter
});
