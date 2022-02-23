import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

function ArticleForm({ articlelist, setArticleList, handleError, setView }) {

    const INITIAL_STATE = {
        title: '',
        body: '',
        image: '',
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
        setState({ ...state, 'image': file })
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);

    }

    const handleSubmit = async e => {

        e.preventDefault();

        const formData = new FormData();

        // for (const [key, value] of Object.entries(object1)) {
        //     console.log(`${key}: ${value}`);
        formData.append('image', state.image);
        formData.append('title', state.title);
        formData.append('body', state.body);

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
    }

    const handleClick = e => {
        e.preventDefault();
        const pk = e.target.value;
        const article = draftlist.find((item) => item.id == pk)
        setState(article);
    }

    const updateArticle = async e => {

        if (state.id) {

            const newData = state

            if (!state.image) {
                delete state.image
            }
            const pk = state.id
            const formData = new FormData();
            for (const [key, value] of Object.entries(newData)) {
                formData.append(`${key}`, `${value}`)
            };

            const options = {
                method: 'PUT',
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

        } else {
        
            const formData = new FormData();

            for (const [key, value] of Object.entries(state)) {
                formData.append(`${key}`, `${value}`)
            };

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
        }

    }

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
                {preview && <img src={preview} alt='preview' />}
            <Button type='button' onClick={()=> setState(INITIAL_STATE)}>Clear Fields</Button>
            <Button type='button' onClick={updateArticle}>Save Draft</Button>
            <Button type='button' onClick={deleteArticle}>Delete Article</Button> 
            <Button type='submit'>Submit Article</Button>
            </Form>
        </div>
    )
}

export default ArticleForm;