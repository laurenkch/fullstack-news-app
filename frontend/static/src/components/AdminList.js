import { useEffect, useState } from 'react';
import { handleError } from './utility';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';

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

    const FILTER_MAP = {
        All: () => true,
        Published: article => article.phase == 'Published',
        Submitted: article => article.phase == 'Submitted',
        Rejected: article => article.phase == 'Rejected',
        Archived: article => article.phase == 'Archived',
    }
    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const filterList = FILTER_NAMES.map((name, index) => (
        <button key={index} type="button" className="btn toggle-btn" onClick={() => setFilter(name)}>
            <span>{name}</span>
        </button>
    ));

    const changePhase = async (e, article) => {

        const formData = new FormData();

        formData.append('phase', e.target.value);
        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData
        }
        const response = await fetch(`/api/v1/articles/admin/${article.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network was not ok');
        }

    }

    const STATUS_NAMES = [
        'Published',
       'Submitted',
        'Rejected',
        'Archived',
    ]

    const articleCheckboxes = (article) => { 
        return(
        STATUS_NAMES
            .map((name, index) => name == article.phase ?
                <Form.Check
                    key={index}
                    inline
                    label={name}
                    name="phase"
                    type='radio'
                    id={`inline-radio`}
                    value={name}
                    defaultChecked
                    onChange={() => changePhase(article)}
                />
                :
                <Form.Check
                    key={index}
                    inline
                    label={name}
                    name="phase"
                    type='radio'
                    id={`inline-radio`}
                    value={name}
                    onChange={(e) => changePhase(e,article)}
                />
            ));
    };


    const listHTML = allarticles
        .filter(FILTER_MAP[filter])
        .map(article => (
            <article key={article.id}>
                <Form>
                    {articleCheckboxes(article)}
                </Form>
                <h3 className='title'>{article.title}</h3>
                <div className='admin-image'>
                    <img src={article.image} alt="article reference" />
                </div>
                <p className='author'>By: {article.authorname}</p>
                <p>{article.body}</p>
                <time className='date' dateTime={article.created_at.slice(0, 10)} >{article.created_at.slice(0, 10)}</time>
            </article>)
        );


    return (
        <div className='admin-outer-wrapper'>
            <div className='admin-inner-wrapper'>
                <div className='navy-block'></div>
                <div className='filters'>
                    <h3>View</h3>
                    {filterList}
                </div>
                <div className='admin-article-view'>
                    {listHTML}
                </div>
            </div>
        </div>
    )
}

export default AdminList;