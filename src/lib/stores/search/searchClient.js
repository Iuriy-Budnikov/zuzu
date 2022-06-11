import axios from 'axios';
import { baseURL } from './searchConst';

export const apiClient = axios.create({
  baseURL
});
