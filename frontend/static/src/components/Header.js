import Button from 'react-bootstrap/Button';


function Header({auth, setView, setAuth}) {

    const handleLogout = e => {
        e.preventDefault();
    }

    const handleLogin = e => {
        e.preventDefault();
        setView(e.target.text)
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
                <li>
                    <Button type='button' name='article-form' onClick={handleClick}>
                    Submit Article
                    </Button>
                </li>
                </div>
                <div className='login-logout-button'>
                {auth ?
                    <li>
                        <Button type='button' onClick={handleLogout}>
                            Logout
                        </Button>
                    </li> : 
                    <li>
                        <Button type='button' onClick={handleLogin}>
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