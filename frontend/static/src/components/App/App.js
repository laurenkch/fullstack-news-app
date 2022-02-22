import './App.css';
import ArticleList from './../ArticleList';
import ArticleForm from './../ArticleForm';
import { useState, useEffect } from 'react';
import Header from './../Header';
import ArticleDetail from './../ArticleDetail';
import Cookies from 'js-cookie';

function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'))
  const [articlelist, setArticleList] = useState(null)
  const [view, setView] = useState('article-list')


  const handleError = (err) => {
    console.warn(err);
  }
  useEffect(() => {

    const getArticles = async () => {
      const response = await fetch('/api/v1/articles/').catch(handleError);
      if (!response.ok) {
        throw new Error("Network response not ok");
      } else {
        const data = await response.json();
        console.log(data)
        setArticleList(data);
      }
    }
    getArticles();
  }, []);

  console.log(view);

  return (
    <div className="App">
      <Header />
      <div className='main'>
      {view === 'article-list' && <ArticleList articlelist={articlelist} setArticleList={setArticleList} handleError={handleError} setView={setView} />}
      {view === 'article-form' && <ArticleForm articlelist={articlelist} setArticleList={setArticleList} handleError={handleError} setView={setView} />}
      {view === 'article-detail' && <ArticleDetail />}
      </div>
    </div>
  );
}

export default App;
