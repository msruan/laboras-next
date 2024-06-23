import { AxiosResponse } from 'axios';

import { api } from '@/config/api';
import { IProfile } from '@/models/profiles';

export async function getUsers(): Promise<AxiosResponse<IProfile[]>> {
  return await api.get(`/profiles`);
}
