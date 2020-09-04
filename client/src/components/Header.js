import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import toggleMenu from '../store/actions/menuToggle';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({ search: '' });

    const toggleMenuHandler = () => dispatch(toggleMenu());
    const redirectHandler = () => {
        history.push('/');
    };
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const inputHandler = e => {
        const { name, value } = e.target;
        setForm(oldForm => {
            return {
                ...oldForm,
                [name]: value,
            };
        });
        history.push({ pathname: `/search/${value}` });
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
            <div className="header-login">
                <img
                    src={process.env.PUBLIC_URL + 'images/user.png'}
                    alt="img"
                    className="header-user-image"
                />
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Dropdown</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
