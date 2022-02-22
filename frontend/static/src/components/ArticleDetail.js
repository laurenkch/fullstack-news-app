

function ArticleDetail({ articlelist, articleClick }) {

    console.log(articleClick)

    const highlightedArticle = articlelist.find(article => article.id == articleClick);

    console.log(highlightedArticle)

    return (
        <article>
            <h3>{highlightedArticle.title}</h3>
            <img src={highlightedArticle.image} alt='submitted'/>
            <p>{highlightedArticle.body}</p>
        </article>
    )
}

export default ArticleDetail;