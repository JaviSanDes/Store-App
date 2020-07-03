import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Header = () => {
    const history = useHistory();
    const [form, setForm] = useState({ search: '' });

    const toggleMenuHandler = () => alert('toggle menu');
    const redirectHandler = () => history.push('/');

    const inputHandler = e => {
        const { name, value } = e.target;
        setForm(oldForm => {
            return {
                ...oldForm,
                [name]: value,
            };
        });
    };

    return (
        <div className="Header-container">
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
            <div className="header-search">
                <img
                    src={process.env.PUBLIC_URL + 'images/search.png'}
                    className="header-search-image"
                    alt="img"
                />
                <input
                    className="header-search-input"
                    placeholder="Search your product"
                    name="search"
                    value={form.search}
                    onChange={e => inputHandler(e)}
                />
            </div>
        </div>
    );
};

export default Header;
