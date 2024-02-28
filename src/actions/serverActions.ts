import {ServerOnlineType} from '../reducers/serverReducer';
import {SetDistributionActionType} from './distributionActions';

export const setServers = (payload: ServerOnlineType) =>
  ({type: 'SET_SERVERS', payload: payload} as const);

type SetServerActionType = ReturnType<typeof setServers>;

export type ServerActionsType = SetServerActionType | SetDistributionActionType;
