import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { handleError } from './utility';

function LoginForm() {
    
    const [navigate, auth, setAuth, articlelist, setArticleList, superuser, setSuperUser] = useOutletContext();

    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
    })

    const handleInput = (e) => {
        const { name, value } = e.target

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }

    const handleError = (err) => {
        console.log(err);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        };

        const response = await fetch("/rest-auth/login/", options).catch(
            handleError
        );

        if (!response.ok) {
            throw new Error("Network response not ok");
        } else {
            const data = await response.json();
            Cookies.set("Authorization", `Token ${data.key}`);
            if (data.is_superuser) {
                setSuperUser(true);
            }
            setAuth(true);
            
        }
        navigate('/');

    }

    return (
        <div className='account-wrapper'>
        <div className='account'>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                id='username'
                name='username'
                type='text'
                required
                onChange={handleInput}
                value={state.username}
            />
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
                id='email'
                name='email'
                type='email'
                required
                onChange={handleInput}
                value={state.email}
            />
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
                id='password'
                name='password'
                type='password'
                required
                onChange={handleInput}
                value={state.password}
            />
            <Button type="submit">Login</Button>
            </Form>
            <button type="button" value="registration" onClick={() => navigate('register/')} className="verification-redirect">I need to make an account</button>
            </div>
        </div>
    )
}

export default LoginForm

