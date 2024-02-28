import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStoreType } from './../store/store';

export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
