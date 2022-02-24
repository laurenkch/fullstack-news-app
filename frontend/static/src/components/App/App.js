import './App.css';
import ArticleList from './../ArticleList';
import ArticleForm from './../ArticleForm';
import { useState, useEffect } from 'react';
import Header from './../Header';
import ArticleDetail from './../ArticleDetail';
import Cookies from 'js-cookie';
import LoginForm from './../LoginForm';
import Registration from './../Registration';
import { Outlet, useNavigate, } from 'react-router-dom';
import { handleError } from './../utility';


function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'))

  const [articlelist, setArticleList] = useState(null)


  const navigate = useNavigate()


  useEffect(() => {

    const getArticles = async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };
      const response = await fetch('/api/v1/articles/', options).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response not ok");
      } else {
        const data = await response.json();
        setArticleList(data);
      }
    }
    getArticles();
  }, []);


  return (
    <div className="App conatiner-fluid">



      <Header auth={auth} setAuth={setAuth}/>
      <main>
        <Outlet context={[navigate, auth, setAuth, articlelist, setArticleList]} />
      </main>





      {/* <Header
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
      </div> */}
    </div>
  );
}

export default App;
