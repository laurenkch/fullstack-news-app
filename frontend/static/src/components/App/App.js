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
  const [superuser, setSuperUser] = useState(null);
  const [articlelist, setArticleList] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {

    const getSuperUserStatus = async() => {
      const options = {
        method: 'GET',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        }
      };
      const response = await fetch('rest-auth/user/', options).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response not ok");
      } else {
        const data = await response.json();
        if (data.is_superuser) {
          setSuperUser(true);
        }
      }
    }

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

    if (auth) {
      getSuperUserStatus();
    }

  }, []);


  return (
    <div className="App conatiner-fluid">



      <Header auth={auth} setAuth={setAuth} navigate={navigate} superuser={superuser} setSuperUser={setSuperUser}/>
      <main>
        <Outlet context={[navigate, auth, setAuth, articlelist, setArticleList, superuser, setSuperUser]} />
      </main>

    </div>
  );
}

export default App;
