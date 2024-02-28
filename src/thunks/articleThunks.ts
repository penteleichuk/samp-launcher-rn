import { setArticles } from '../actions/articleActions';
import { ArticleService } from '../services/article.service';
import { AppThunk } from '../store/store';

export const fetchArticles = (): AppThunk => async dispatch => {
  try {
    const articles = await ArticleService.get();
    dispatch(setArticles({ articles }));
  } catch (e) {
    console.log(e);
  }
};
