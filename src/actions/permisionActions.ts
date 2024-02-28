import {PermissionStatusType} from '../reducers/permisionReducer';

export const setPermisions = (payload: {
  filesWrite: PermissionStatusType;
  filesRead: PermissionStatusType;
  microphone: PermissionStatusType;
}) => ({type: 'SET_PERMISIONS', payload} as const);

type SetPermisionsActionType = ReturnType<typeof setPermisions>;

export type PermisionActionsType = SetPermisionsActionType;
