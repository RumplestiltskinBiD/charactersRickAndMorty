import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import logo from "../../logo/logoRickAndMorty.png"
import './navbarStyles.css'


const AppNavbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >
                        <NavLink className="linkStyle" to="/page/1">
                            <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Rick & Morty: Characters
                        </NavLink>
                    </Navbar.Brand>

                    {
                        !isAuth && <NavLink className="linkStyle" to="/registration">
                            <div>Registration</div>
                        </NavLink>
                    }
                    {
                        !isAuth && <NavLink className="linkStyle" to="/login">
                        <div>Login</div>
                    </NavLink>
                    }
                    {
                        isAuth && <NavLink className="linkStyle" to="/userpage">
                            <div>My page</div>
                        </NavLink>
                    }
                    {
                        isAuth && <div className="linkStyle logout" onClick={() => dispatch(logout())}>
                        Log out
                        </div>
                    }
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavbar;