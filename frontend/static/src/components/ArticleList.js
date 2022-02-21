
function ArticleList({ articlelist, setArticleList }) {

    if (!articlelist) {
        return 'Loading articles...'
    }

    const articleHTML =
        articlelist.map((article) =>
            <article
                key={article.id}>
                <h3>
                    {article.title}
                </h3>
                <img src={article.image} alt='article'/>
                <p>
                    {article.body}
                </p>
            </article>
        )

    return (
        <section>{articleHTML}</section>
    )
}

export default ArticleList;