import './App.css';
import ArticleList from './../ArticleList';
import ArticleForm from './../ArticleForm';
import { useState, useEffect } from 'react';
import Header from './../Header';
import ArticleDetail from './../ArticleDetail';
import Cookies from 'js-cookie';
import LoginForm from './../LoginForm';
import Registration from './../Registration'; 

function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'))
  const [articlelist, setArticleList] = useState(null)
  const [view, setView] = useState('article-list')
  const [articleClick, setArticleClick] = useState('');


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
        setArticleList(data);
      }
    }
    getArticles();
  }, []);

  if (!articlelist) {
    return 'Loading articles...'
  }

  return (
    <div className="App">
      <Header
        setView={setView}
        auth={auth}
        setAuth={setAuth} 
        handleError={handleError}
      />
      <div className='main'>
        {view === 'login' && 
          <LoginForm
          setView={setView}
          setAuth={setAuth}
          />
        }
        {view === 'registration' && 
          <Registration
          setView={setView}
          setAuth={setAuth}
          />
        }
        {view === 'article-list' &&
          <ArticleList
            articlelist={articlelist}
            setView={setView}
            setArticleClick={setArticleClick}
          />}
        {view === 'article-form' &&
          <ArticleForm
            articlelist={articlelist}
            setArticleList={setArticleList}
            handleError={handleError}
            setView={setView}
          />}
        {view === 'article-detail' &&
          <ArticleDetail
            articleClick={articleClick}
            articlelist={articlelist}
          />}
      </div>
    </div>
  );
}

export default App;
