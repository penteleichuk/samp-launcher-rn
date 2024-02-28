export const setIsUpdateScreen = (payload: {isUpdate: boolean}) =>
  ({
    type: 'SET_IS_UPDATE_SCREEN',
    payload,
  } as const);

export const setSelectServer = (payload: {selectedServer: number}) =>
  ({
    type: 'SET_SELECT_SERVER',
    payload,
  } as const);

export const setInitial = (payload: {initial: boolean}) =>
  ({
    type: 'SET_INITIAL',
    payload,
  } as const);

export const setGPU = (value: string) =>
  ({
    type: 'SET_GPU',
    payload: {
      gpu: value,
    },
  } as const);

type SetIsUpdateScreenActionType = ReturnType<typeof setIsUpdateScreen>;
type SetSelectServerActionType = ReturnType<typeof setSelectServer>;
type SetInitialActionType = ReturnType<typeof setInitial>;
type SetGPUActionType = ReturnType<typeof setGPU>;

export type AppActionsType =
  | SetIsUpdateScreenActionType
  | SetSelectServerActionType
  | SetInitialActionType
  | SetGPUActionType;
