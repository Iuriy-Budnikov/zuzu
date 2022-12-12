import { API_HOST_CMS } from '$env/static/private';
import { ApiClient } from './ApiClient';

export default new ApiClient({
  baseURL: API_HOST_CMS
});
