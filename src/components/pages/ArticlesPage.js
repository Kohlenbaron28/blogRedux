import { useParams } from 'react-router-dom';

import ArticleList from '../ArticleList/ArticleList';

const ArticlesPage = () => {
  const params = useParams();
  console.log(params);

  return <ArticleList />;
};
export default ArticlesPage;
