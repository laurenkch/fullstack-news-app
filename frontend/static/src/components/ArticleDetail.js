// import Button from 'react-bootstrap/Button';

function ArticleDetail({ articlelist, articleClick }) {

    const highlightedArticle = articlelist.find(article => article.id == articleClick);

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