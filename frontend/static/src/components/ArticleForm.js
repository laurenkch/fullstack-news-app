import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { useOutletContext, Link } from 'react-router-dom';
import { handleError } from './utility';


function ArticleForm() {

    const [navigate, auth, setAuth, articlelist, setArticleList] = useOutletContext();


    const INITIAL_STATE = {
        title: '',
        body: '',
        image: '',
        file: '',
    }
    const [state, setState] = useState(INITIAL_STATE)

    const [preview, setPreview] = useState(null)

    const [draftlist, setDraftList] = useState(null)


    const handleInput = (e) => {
        const { name, value } = e.target
        
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const getDraftArticles = async () => {
            const response = await fetch('/api/v1/articles/user/').catch(handleError);
            if (!response.ok) {
                throw new Error("Network response not ok");
            } else {
                const data = await response.json();
                setDraftList(data);
            }
        }
        getDraftArticles();
    }, [handleError]);

    if (!draftlist) {
        return 'Fetching drafts...'
    }

    const previewImage = e => {
        const file = e.target.files[0];
        setState({ ...state, 'file': file })
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);

    }

    const handleClick = e => {
        e.preventDefault();
        const pk = e.target.value;
        const article = draftlist.find((item) => item.id == pk)
        setState(article);
        if (article.image) {
            setPreview(article.image);
        } else {
            setPreview(null)
        }
    }

    //////////////////////////////////////////////////////////////////////// SAVE (post and patch)

    const saveArticle = async e => {

        if (state.id) {

            const pk = state.id
            const formData = new FormData();
            
            formData.append('id', state.id);
            formData.append('title', state.title);
            formData.append('body', state.body);
            if (state.file) {
                formData.append('image', state.file)
            }


            const options = {
                method: 'PATCH',
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: formData,
            }
            const response = await fetch(`/api/v1/articles/edit/${pk}/`, options).catch(handleError);

            if (!response.ok) {
                throw new Error('Network was not ok');
            }
            const submittedArticle = await response.json()
            setArticleList([...draftlist, submittedArticle.title])
            setState(INITIAL_STATE);
            setPreview(null);
            // clears image iput on form
            e.target.form[2].value = ''


        } else {
        
            const formData = new FormData();
           
            formData.append('title', state.title);
            formData.append('body', state.body);
                
            if (state.file) {
                formData.append('image', state.file)
            }
            if (state.image) {
                formData.append('image', state.image)
            }


            const options = {
                method: 'POST',
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: formData,
            }

            const response = await fetch('/api/v1/articles/user/', options).catch(handleError);

            if (!response.ok) {
                throw new Error("Network response not ok");
            }
            const submittedArticle = await response.json()
            setArticleList([...draftlist, submittedArticle.title])
            setState(INITIAL_STATE);
            setPreview(null);
        }
        
        // clears image iput on form
        e.target.form[2].value = ''

    }

    //////////////////////////////////////////////////////////////////////// Delete 


    const deleteArticle = async (e)=> {
        
        const pk = state.id;

        const options = {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }
            const response = await fetch(`/api/v1/articles/edit/${pk}`, options).catch(handleError)
            if (!response.ok) {
                throw new Error('Network was not ok');
            }
        const newdraftList = draftlist.filter((item) => (item.id != pk))
        setDraftList(newdraftList)
        setState(INITIAL_STATE)
        e.target.form[2].value = ''
        setPreview(null);
    }

    //////////////////////////////////////////////////////////////////////// Submit/Publish 


    const handleSubmit = async e => {

        e.preventDefault();

        const pk = state.id

        const formData = new FormData();

        formData.append('title', state.title);
        formData.append('body', state.body);
        formData.append('phase', 'Submitted');
        if (state.file) {
            formData.append('image', state.file)
        };

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api/v1/articles/edit/${pk}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error("Network response not ok");
        }

        const newdraftList = draftlist.filter((item) => (item.id != pk))
        setDraftList(newdraftList)
        setState(INITIAL_STATE)
        e.target.form[2].value = ''
        setPreview(null);
    }

    //////////////////////////////////////////////////////////////////////// CLEAR FIELDS

    const clearFields = e => {
        setState(INITIAL_STATE)
        setPreview(null)
    }

    const draftsHTML = draftlist.map((article) => <button key={article.id} type='button' value={article.id} onClick={handleClick}>{article.title} </button>)

    return (
        <div>
        <h2>Draft List</h2>
        {draftsHTML}

        <h2>
            Submit an Article
        </h2>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                id='title'
                name='title'
                type='text'
                onChange={handleInput}
                value={state.title}
                autoComplete='off'
                required
            />
            <Form.Label htmlFor="body">Body</Form.Label>
            <Form.Control
                id='body'
                name='body'
                type='textarea'
                onChange={handleInput}
                value={state.body}
                autoComplete='off'
                required
            />
            <Form.Label htmlFor="image">Image</Form.Label>
            <Form.Control
                id='image'
                name='image'
                type='file'
                onChange={previewImage}
                />
                {preview && <div><img src={preview} alt='preview' /></div>}
            <Button type='button' onClick={clearFields}>Clear Fields</Button>
            <Button type='button' className='save-draft'onClick={saveArticle}>Save Draft</Button>
            <Button type='button' className='delete-draft' onClick={deleteArticle}>Delete Draft</Button> 
            <Button type='submit' className='delete-draft'>Submit Article</Button>
            </Form>
        </div>
    )
}

export default ArticleForm;