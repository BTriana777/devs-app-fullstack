import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { AuthContext } from '../components/auth/AuthContext';
 
 
export const PublicRoute = ({isAuth,  children }) => {
    const {user} = useContext(AuthContext)
    console.log(user.name? 'true' : 'false');
    // ( user.name? <Navigate to="/" /> : <Navigate to='/auth/welcome' />)
    return isAuth ? ( user.name? <Navigate to="/" /> : <Navigate to='/welcome' />) : children;
};
 
PublicRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    element: PropTypes.object.isRequired
}