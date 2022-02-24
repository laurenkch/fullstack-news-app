import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';


function Header(props) {

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
            props.handleError
        );

        if (!response.ok) {
            throw new Error("Network response not ok");
        } else {
            Cookies.remove("Authorization");
            props.setAuth(false);
        }
    }

    // const handleLogin = e => {
    //     e.preventDefault();
    //     setView(e.target.value)
    // }

    // const handleClick = e => {
    //     e.preventDefault();
    //     setView(e.target.name)
    // }

                //     <li><NavLink to='/'>Home</NavLink></li>
                // <li><NavLink to='/profile'>Profile</NavLink></li>
                // <li><NavLink to='/login'>Login</NavLink></li>
                // <li>
                //     <button type='button' onClick={handleLogout}>Logout</button>
                // </li>

    return (
        <nav>
            <ul>
                <div className='nav-buttons'>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                    {props.auth &&
                        <li>
                            <NavLink to='/drafts'>
                                Drafts
                            </NavLink>
                        </li>}
                </div>
                <div className='login-logout-button'>
                {props.auth ?
                    <li>
                        <button type='button' onClick={handleLogout} value={'logout'}>
                            Logout
                        </button>
                    </li> : 
                    <li>
                            <NavLink to='login'>Login</NavLink>
                    </li>
                }
                </div>
            </ul>
        </nav>
    )
}

export default Header