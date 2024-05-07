import React from 'react';
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SuperAdminPage from '../pages/SuperAdmin/SuperAdmin';
import AddUsers from '../pages/SuperAdmin/AddUsers';
// import SuperAdmin from '../pages/SuperAdminDashboard/SuperAdmin';
// import Admin from '../pages/AdminDashboard/AdminDashboard';
// import Home from '../pages/Home';
// import PlacementStats from '../pages/Placement Graphs/PlacementStats';
// import TrainingNames from '../pages/TrainingNamesController/TrainingNames';
// import EditProfile from '../pages/EditProfile/EditProfile';

interface JwtPayload {
    username: string,
    role: string
}

const ProtectedRoute = ({ component: Component, path, ...rest }: { component: any, path: string }) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        return <Navigate to="/login" replace />;
    } else {
        try {
            const decodedToken: JwtPayload = jwtDecode(authToken);
            const userRole = decodedToken.role
            console.log(userRole)

            if (path === '/' && userRole) {
                return <Navigate to="/" replace />;
            }

            if (path === '/login' && userRole) {
                return <Navigate to="/home" replace />;
            }

            if (path === '/' && userRole === 'SuperAdmin') {
                return <Navigate to="/superadmin" replace />;
            }

            if (path === '/login' && userRole === 'SuperAdmin') {
                return <Navigate to="/superadmin" replace />;
            }

            

            if (userRole === 'SuperAdmin') {
                // if (path === '/superadmin/add-users') {
                //     return <AddUsers />
                // }
                // else if (path === '/superadmin/trainingNames') {
                //     return <TrainingNames />
                // }
                // else if (path === '/admin/editProfile') {
                //     return <EditProfile />
                // }
                // else {
                    // return <Navigate to="/superadmin" replace />
                // }

                // } else if (userRole === 'admin') {
                //     // Redirect admin to home if trying to access superadmin route
                //    if (path === '/admin/editProfile') {
                //     return <EditProfile />
                // }else{
                //        return <Admin />;
                // }

                } else {
                    // Redirect to home or another appropriate route if the user doesn't have the required role
                    if (path === '/admin' || path === '/superadmin' || path === '/superadmin/placementStats' || path === '/superadmin/trainingNames' || path==='/admin/editProfile') {
                        return <Home/>;
                    }
                    return <Component {...rest} />;
                }
            } catch (error) {
                // If there's an error decoding the token, redirect to login
                console.error('Error decoding token:', error);
                return <Navigate to="/login" replace />;
            }
        }
};

    export default ProtectedRoute;
