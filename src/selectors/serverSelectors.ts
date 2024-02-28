import { AppStoreType } from '../store/store';

export const selectServers = (state: AppStoreType) => state.server.servers;
export const selectServer = (state: AppStoreType, selectedServer: number) =>
  state.server.servers.find(el => el.id === selectedServer);
