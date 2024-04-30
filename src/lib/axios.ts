import axios from 'axios';

import { envs } from '@/config';

const api = axios.create({
  baseURL: envs.coinGeckoApiBaseUrl
});

export default api;
