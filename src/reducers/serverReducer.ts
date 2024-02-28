import { ServerActionsType } from '../actions/serverActions';
import { ServerType } from '../services/distribution.service';

export type ServerOnlineType = ServerType & {
  online: number;
  slot: number;
  status: boolean;
  loading: boolean;
};

const serverInitState = {
  servers: [] as ServerOnlineType[],
};

export type ServerStateType = typeof serverInitState;

export const serverReducer = (
  state = serverInitState,
  action: ServerActionsType,
): ServerStateType => {
  switch (action.type) {
    case 'SET_DISTRIBUTION': {
      const serverLists = action.payload.servers.map(el => ({
        ...el,
        online: 0,
        slot: 1000,
        status: false,
        loading: true,
      }));
      return {
        ...state,
        servers: [...serverLists],
      };
    }
    case 'SET_SERVERS': {
      const servers = state.servers.map(el => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload };
        } else {
          return el;
        }
      });

      return {
        ...state,
        servers,
      };
    }
    default:
      return state;
  }
};
