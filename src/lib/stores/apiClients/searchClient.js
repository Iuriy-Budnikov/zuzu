import axios from 'axios';
import { lang } from '../search/searchConst';

const axiosParams = {
  baseURL: '',

  params: {
    lang
  }
};

const apiClient = axios.create(axiosParams);

export default apiClient;
