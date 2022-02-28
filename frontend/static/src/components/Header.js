import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { handleError } from './utility';

function Header({ auth, setAuth, navigate, superuser, setSuperUser}) {

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
            Cookies.remove("Authorization");
            setAuth(false);
            setSuperUser(false);
        }
        navigate('/');
    }

    return (
        <nav>
            <ul>
                <div className='nav-links'>
                <li>
                    <NavLink className='btn toggle-btn' to='/'>Home</NavLink>
                </li>
                    {auth && !superuser &&
                                <li>
                            <NavLink className='btn toggle-btn' to='/drafts'>
                                        Drafts
                                    </NavLink>
                                </li>
                        }
                    {superuser &&
                        <li>
                            <NavLink className='btn toggle-btn' to='/admin'>
                                Admin
                            </NavLink>
                        </li>
                    }
                </div>
                <div className='login-logout-button'>
                {auth ?
                    <li>
                        <button type='button' className='btn toggle-btn' onClick={handleLogout} value={'logout'}>
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