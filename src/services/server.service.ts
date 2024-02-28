import axios from 'axios';
import { getServerQuery } from '../helpers/sampQuery';

export const ServerService = {
  async online(adress: string) {
    return await axios
      .get<{ core: ServerResponseType }>('https://api.open.mp/server/' + adress)
      .then(res => res.data.core.pc);
  },

  async getOnline(host: string) {
    return getServerQuery({ host, timeout: 5000 }).then(res => res);
  },
};

export type ServerType = {
  id: number;
  address: string;
  name?: string;
  icon?: string;
  online?: number;
  slot?: number;
  bonus?: boolean;
};

export type ServerResponseType = {
  ip: string;
  hn: string;
  pc: number;
  pm: number;
  gm: string;
  la: string;
  pa: boolean;
  vn: string;
};
