import React, {useEffect, useState} from "react";
import './App.scss';
import {BrowserRouter, NavLink, Route, Routes, Navigate} from "react-router-dom";
import HomePage from './components/HomePage/HomePage'
import CharacterPage from "./components/CharacterPage/CharacterPage";
import VerificationPage from "./components/VerificationPage/VerificationPage";
import AppNavbar from "./components/Navbar/Navbar";
import LoginPage from "./components/VerificationPage/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/userActions";
import UserPage from "./components/UserPage/UserPage";


function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()


    useEffect(() => {
        if (localStorage.getItem('token')){
            dispatch(auth())
        }
    }, [])

  return (
      <BrowserRouter>
        <div className="App">
            <AppNavbar />
            {
                !isAuth ?
                    <Routes>
                        <Route path="/page/:page" element={<HomePage/>}/>
                        <Route path="/character/:id" element={<CharacterPage/>}/>
                        <Route path="/registration" element={<VerificationPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="*" element={<Navigate replace to="/page/1"/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/page/:page" element={<HomePage/>}/>
                        <Route path="/character/:id" element={<CharacterPage/>}/>
                        <Route path="/userpage" element={<UserPage/>}/>
                        <Route path="*" element={<Navigate replace to="/page/1"/>}/>
                    </Routes>
            }
        </div>
      </ BrowserRouter>
  );
}

export default App;
