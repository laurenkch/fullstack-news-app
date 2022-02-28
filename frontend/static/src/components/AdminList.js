import { useEffect, useState } from 'react';
import { handleError } from './utility';
import Form from 'react-bootstrap/Form';

function AdminList() {


    const [allarticles, setAllArticles] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const getAllArticles = async () => {

            const response = await fetch('/api/v1/articles/all/').catch(handleError);
            if (!response.ok) {
                throw new Error('Network response not ok');
            } else {
                const data = await response.json();
                setAllArticles(data);
            }
            }
        getAllArticles();
    }, [])
    
    if (!allarticles) {
        return 'Loading...'
    }
    console.log(allarticles);
    const FILTER_MAP = {
        All: () => true,
        Published: article => article.phase == 'Published',
        Submitted: article => article.phase == 'Submitted',
        Rejected: article => article.phase == 'Rejected',
        Archived: article => article.phase == 'Archived',
    }
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    const filterList = FILTER_NAMES.map((name, index) => (
        <button key={index} type="button" className="btn toggle-btn" onClick={() => setFilter(name)}>
            <span>{name}</span>
        </button>
    ));

    const listHTML = allarticles
        .filter(FILTER_MAP[filter])
        .map(article => (
            <article key={article.id}>
                <div className='admin-image'>
                    <img src={article.image} alt="article reference" />
                </div>
                <h3>{article.title}</h3>
                <p>{article.author}</p>
                <p>{article.body}</p>
                <Form.Select aria-label="Default select example" onSubmit={handleSubmit}>
                    <option>Adjust article status</option>
                    <option value="Published">Published</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Archived">Archived</option>
                    <button type='submit'>Submit</button>
                </Form.Select>
            </article>)
        );


    return (
        <div className='wrapper'>
            {filterList}
            {listHTML}
        </div>
    )
}

export default AdminList;