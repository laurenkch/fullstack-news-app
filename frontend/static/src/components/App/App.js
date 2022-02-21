import './App.css';
import ArticleList from './../ArticleList';
import ArticleForm from './../ArticleForm';
import { useState, useEffect } from 'react';

function App() {

  const [articlelist, setArticleList] = useState(null)

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

  return (
    <div className="App">
      <ArticleList articlelist={articlelist} setArticleList={setArticleList} handleError={handleError}/>
      <ArticleForm articlelist={articlelist} setArticleList={setArticleList} handleError={handleError}/>
    </div>
  );
}

export default App;
