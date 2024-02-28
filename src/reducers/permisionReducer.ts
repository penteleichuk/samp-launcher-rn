import { PermisionActionsType } from '../actions/permisionActions';

export type PermissionStatusType = 'granted' | 'denied' | 'never_ask_again';

const permisionInitState = {
  filesWrite: 'denied' as PermissionStatusType,
  filesRead: 'denied' as PermissionStatusType,
  microphone: 'denied' as PermissionStatusType,
};

export type PermisionStateType = typeof permisionInitState;

export const permisionReducer = (
  state = permisionInitState,
  action: PermisionActionsType,
): PermisionStateType => {
  switch (action.type) {
    case 'SET_PERMISIONS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
