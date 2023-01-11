import React, { useEffect } from 'react';
import { userInfo } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import './userPageStyles.css'

const UserPage = () => {
    const dispatch = useDispatch()
    const bioEmail = useSelector(state => state.bio.currentBio.data?.userEmail)
    const bioPass = useSelector(state => state.bio.currentBio.data?.userPassword)

    useEffect(() => {
        dispatch(userInfo())
    }, [])

    return (
        <div className="userInfo">
            My info
            <div>
                Email: {bioEmail}
            </div>
            <div>
                Password: {bioPass}
            </div>
        </div>
    );
};

export default UserPage;