import Card from 'react-bootstrap/Card';

function ArticleList({ articlelist, setArticleList }) {

    if (!articlelist) {
        return 'Loading articles...'
    }

    const articleHTML =
        articlelist.map((article) =>
            <article
                key={article.id}>
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
            </article>
        )

    return (
        <section className="article-list">{articleHTML}</section>
    )
}

export default ArticleList;