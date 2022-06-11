import { API_HOST, API_TOKEN } from '$lib/constants/api';
import axios from 'axios';
import { lang } from './searchConst';

export const apiClient = axios.create({
  baseURL: API_HOST,

  params: {
    lang,
    access_token: API_TOKEN
  }
});
