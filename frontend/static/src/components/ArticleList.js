import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useOutletContext, Link } from 'react-router-dom';
import { handleError } from './utility';

function ArticleList() {

    const [navigate, auth, setAuth, articlelist, setArticleList] = useOutletContext();


    if (!articlelist) {
        return 'Loading articles...'
    }

    const articleHTML =
        articlelist.map((article) =>
            <article
                key={article.id}>
                <Link to={`article/${article.id}`}>
                <Card>
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
                </Link>    
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