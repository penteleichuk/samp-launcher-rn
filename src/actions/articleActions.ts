import {ArticleType} from '../services/article.service';

export const setArticles = (payload: {articles: ArticleType[]}) =>
  ({type: 'SET_ARTICLES', payload: payload} as const);

type SetArticleActionType = ReturnType<typeof setArticles>;

export type ArticleActionsType = SetArticleActionType;
