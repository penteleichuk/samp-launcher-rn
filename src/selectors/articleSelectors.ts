import { AppStoreType } from '../store/store';

export const selectArticles = (state: AppStoreType) => state.article.articles;
