import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';


function Header({ auth, setView, setAuth, handleError}) {

    const handleLogout = async e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        };

        const response = await fetch("/rest-auth/logout/", options).catch(
            handleError
        );

        if (!response.ok) {
            throw new Error("Network response not ok");
        } else {
            // Cookies.remove("Authorization");
            setAuth(false);
        }

        setView('article-list')

    }

    const handleLogin = e => {
        e.preventDefault();
        setView(e.target.value)
    }

    const handleClick = e => {
        e.preventDefault();
        setView(e.target.name)
    }


    return (
        <nav>
            <ul>
                <div className='nav-buttons'>
                <li>
                    <Button
                        type='button'
                        name='article-list'
                        onClick={handleClick}
                    >Home</Button>
                </li>
                    {auth &&
                        <li>
                            <Button type='button' name='article-form' onClick={handleClick}>
                                Submit Article
                            </Button>
                        </li>}
                </div>
                <div className='login-logout-button'>
                {auth ?
                    <li>
                        <Button type='button' onClick={handleLogout} value={'logout'}>
                            Logout
                        </Button>
                    </li> : 
                    <li>
                            <Button type='button' onClick={handleLogin} value={'login'}>
                            Login
                        </Button>
                    </li>
                }
                </div>
            </ul>
        </nav>
    )
}

export default Header