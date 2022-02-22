import Button from 'react-bootstrap/Button';


function Header(props) {
    
    const handleLogout = e => {
        e.preventDefault();
    }

    const handleLogin = e => {
        e.preventDefault();
        console.log(e)
        props.setView(e.target.text)
    }


    return (
        <nav>
            <ul>
                <li>
                    <Button>
                    Home
                    </Button>
                </li>
                <li>
                    <Button>
                        Submit Article
                    </Button>
                </li>
                {props.auth ?
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
            </ul>
        </nav>
    )
}

export default Header