
import { useParams, useOutletContext } from 'react-router-dom';
import { handleError } from './utility';
import { useState } from 'react';
import Cookies from 'js-cookie';

function ArticleDetail() {

    let params = useParams();
    const [navigate, auth, setAuth, articlelist, setArticleList] = useOutletContext();

    const getArticle = async () => {

        const options = {
            method: 'GET',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        };
        const response = await fetch(`/api/v1/articles/${params.id}`, options).catch(handleError);
        if (!response.ok) {
            throw new Error("Network response not ok");
        } else {
            const data = await response.json();
            setHighlightedArticle(data);
        }
    }

    const [highlightedArticle, setHighlightedArticle] = useState(null);

    if (!highlightedArticle) {
        if (articlelist) {
            let article = articlelist.find(article => article.id == params.id);
            setHighlightedArticle(article);
        } else {
            getArticle();
        }
    }

    if (!highlightedArticle) {
        return 'Fetching article...'
    }

    return (
        <div>
        <article>
            <h3>{highlightedArticle.title}</h3>
            <img src={highlightedArticle.image} alt='submitted by author'/>
            <p>{highlightedArticle.body}</p>
            </article>
        </div>
    )
}

export default ArticleDetail;