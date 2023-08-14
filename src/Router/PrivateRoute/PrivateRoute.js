import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner3 from '../../Components/LoadingSpinners/Spinner3';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <>
            <Spinner3></Spinner3>
        </>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;