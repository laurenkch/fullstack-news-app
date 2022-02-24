import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { handleError } from './utility';

function Header({auth, setAuth}) {

    console.log(auth)
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
        }
    }

    return (
        <nav>
            <ul>
                <div className='nav-buttons'>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                    {auth &&
                        <li>
                            <NavLink to='/drafts'>
                                Drafts
                            </NavLink>
                        </li>}
                </div>
                <div className='login-logout-button'>
                {auth ?
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