import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

function ArticleForm({ articlelist, setArticleList, handleError }) {

    const [state, setState] = useState({
        title: '',
        body: '',
        image: '',
    })

    const [preview, setPreview] = useState(null)


    const handleInput = (e) => {
        const { name, value } = e.target
        
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const previewImage = e => {
        const file = e.target.files[0];
        console.log(file)
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

        const response = await fetch('/api/v1/articles/', options).catch(handleError);

        if (!response.ok) {
            throw new Error("Network response not ok");
        }

        const submittedArticle = await response.json()
        setArticleList([...articlelist, submittedArticle])
    }
    

    return (
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
                required
            />
            {preview && <img src={preview} alt='preview'/>}
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default ArticleForm;