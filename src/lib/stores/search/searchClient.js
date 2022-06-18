import { API_HOST, API_TOKEN } from '$lib/constants/api';
import axios from 'axios';
import axiosCache from 'axios-cache-adapter';
import { lang } from './searchConst';
const { setupCache } = axiosCache;

const axiosParams = {
  baseURL: API_HOST,

  params: {
    lang,
    access_token: API_TOKEN
  }
};

export const apiClient = axios.create(axiosParams);

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
  adapter: apiCache.adapter
});
