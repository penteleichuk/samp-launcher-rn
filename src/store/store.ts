import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { AlertActionsType } from '../actions/alertActions';
import { AppActionsType } from '../actions/appActions';
import { ArticleActionsType } from '../actions/articleActions';
import { DistributionActionsType } from '../actions/distributionActions';
import { DonateActionsType } from '../actions/donateActions';
import { LoaderActionsType } from '../actions/loaderActions';
import { PermisionActionsType } from '../actions/permisionActions';
import { ServerActionsType } from '../actions/serverActions';
import { SettingActionsType } from '../actions/settingsActions';
import { alertReducer } from '../reducers/alertReducer';
import { appReducer } from '../reducers/appReducer';
import { articleReducer } from '../reducers/articleReducer';
import { distributionReducer } from '../reducers/distributionReducer';
import { donateReducer } from '../reducers/donateReducer';
import { loaderReducer } from '../reducers/loaderReducer';
import { permisionReducer } from '../reducers/permisionReducer';
import { serverReducer } from '../reducers/serverReducer';
import { settingReducer } from '../reducers/settingsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  alert: alertReducer,
  settings: settingReducer,
  loader: loaderReducer,
  donate: donateReducer,
  article: articleReducer,
  permision: permisionReducer,
  distribution: distributionReducer,
  server: serverReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;

export type ActionType =
  | AppActionsType
  | AlertActionsType
  | DonateActionsType
  | SettingActionsType
  | LoaderActionsType
  | ServerActionsType
  | ArticleActionsType
  | PermisionActionsType
  | DistributionActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  ActionType
>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
