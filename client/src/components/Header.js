import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { logOut } from '../store/actions/auth';
import toggleMenu from '../store/actions/menuToggle';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);
    const token = useSelector(state => state.auth.token);
    const location = useLocation();
    const [form, setForm] = useState({ search: '' });
    const [isvisivle, setIsVisible] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const toggleMenuHandler = () => dispatch(toggleMenu());
    const redirectHandler = () => {
        history.push('/');
    };

    useEffect(() => {
        const other =
            location.pathname === '/checkout' ||
            location.pathname === '/settings' ||
            location.pathname === '/orders' ||
            location.pathname === '/Auth';
        other ? setIsHidden(true) : setIsHidden(false);
    }, [location]);

    const inputHandler = e => {
        const { name, value } = e.target;
        setForm(oldForm => {
            return {
                ...oldForm,
                [name]: value,
            };
        });
        history.push({ pathname: `/search/${value.toLowerCase()}` });
    };
    const handleUserKeyPress = e => {
        if (e.target.className !== 'header-user-image') setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleUserKeyPress);

        return () => {
            window.removeEventListener('click', handleUserKeyPress);
        };
    }, []);

    const clickHandler = () => {
        setIsVisible(val => !val);
    };

    const logOutHandler = () => {
        dispatch(logOut());
    };

    const signHandler = () => {
        history.push('/Auth');
    };

    return (
        <div className="Header">
            <div className="Header-container" id="Header-container-id">
                <button
                    className="Header-button"
                    onClick={toggleMenuHandler}
                    type="button"
                >
                    <div className="Header-butto-linen" />
                    <div className="Header-butto-linen" />
                    <div className="Header-butto-linen" />
                </button>
                <div
                    className="header-home"
                    onClick={redirectHandler}
                    role="button"
                >
                    <h1 className="header-home-link">E</h1>
                    <h1 className="header-home-link-2">commerce</h1>
                </div>
                {!isHidden && (
                    <div className="header-search">
                        <img
                            src={process.env.PUBLIC_URL + 'images/search.png'}
                            className="header-search-image"
                            alt="img"
                            role="button"
                        />
                        <input
                            className="header-search-input"
                            placeholder="Search your product"
                            name="search"
                            value={form.search}
                            id="header-search-input-id"
                            onChange={e => inputHandler(e)}
                        />
                    </div>
                )}

                <div className="header-login">
                    <img
                        src={process.env.PUBLIC_URL + 'images/user.png'}
                        alt="img"
                        className="header-user-image"
                        onClick={clickHandler}
                        role="button"
                    />
                    {isvisivle && (
                        <div className="header-user-box">
                            <div className="header-triangle"></div>
                            <div>
                                <p>Welcome, {`${firstName} ${lastName}!`}</p>
                                <p>Enjoy your shopping</p>
                            </div>
                            <NavLink to="/settings">
                                <button type="button">Settings</button>
                            </NavLink>
                            <NavLink to="/orders">
                                <button type="button">My Purchases</button>
                            </NavLink>

                            <button
                                type="button"
                                className="header-logOut-button"
                                onClick={logOutHandler}
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {!token && (
                <div className="Header-container-button">
                    <button type="button" onClick={signHandler}>
                        SignIn/SignUp
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
