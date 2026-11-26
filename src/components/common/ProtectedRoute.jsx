import React from "react";

import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";

function ProtectedRoute({ allowedRoles = [] }) {

    const {
        user,
        loading,
        isAuthenticated
    } = useAuth();

    const location = useLocation();

    if (loading) {
        return (
            <div className="loading-page">
                <div className="loading-spinner"></div>
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location
                }}
            />
        );
    }

    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;