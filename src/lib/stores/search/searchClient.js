import axios from 'axios';
import { lang } from './searchConst';

const axiosParams = {
  baseURL: '',

  params: {
    lang
  }
};

export const apiClient = axios.create(axiosParams);
