import axios from 'axios';

import { envs } from '@/common';

const api = axios.create({
  baseURL: envs.coinGeckoApiBaseUrl
});

export default api;
