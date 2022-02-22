import Card from 'react-bootstrap/Card';

function ArticleList({ articlelist, setView, setArticleClick }) {

    if (!articlelist) {
        return 'Loading articles...'
    }

    const handleClick = (e) => {
        setView('article-detail')
        setArticleClick(e.currentTarget.id)
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