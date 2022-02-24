import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { handleError } from './utility';
import Cookies from 'js-cookie';
import { useOutletContext } from 'react-router-dom';

function ArticleList() {

    const [articlelist, setArticleList] = useState(null)
    const [navigate, auth, setAuth] = useOutletContext();

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
    }, [auth]);

    const handleClick = (e) => {
        // setArticleClick(e.currentTarget.id)
        console.log('click');
    }

    if (!articlelist) {
        return 'Loading articles...'
    }

    const articleHTML =
        articlelist.map((article) =>
            <article
                key={article.id}>
                <Card onClick={handleClick} id={article.id}>
                <div className= 'thumbnail-img'>
                    <img src={article.image} alt='article' />
                </div>
                <h3>
                    {article.title}
                </h3>
                <p className='truncate'>
                    {article.body}
                </p>
                </Card>
            </article>
        )

    return (
        <div>
            <h2>
                Articles
            </h2>
            <section className="article-list">
                {articleHTML}
            </section>
        </div>
    )
}


export default ArticleList;