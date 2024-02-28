import { URL_NEWS_API } from '@env';
import axios from 'axios';

export const ArticleService = {
  async get() {
    return await axios.get<ArticleType[]>(URL_NEWS_API).then(res => res.data);
  },
};

export type ArticleType = {
  title: string;
  image: string;
  slug: string;
  description: string;
  created_at: string;
};
