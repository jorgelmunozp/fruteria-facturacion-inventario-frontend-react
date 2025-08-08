import { lazy, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
const DashboardRoutes = lazy(() => import('./DashboardRoutes.js'));

export const PublicRoute = ({ children,urlBaseFrontend }) => {
    const { user } = useContext(AuthContext);

    return user.logged ? <DashboardRoutes urlBaseFrontend={urlBaseFrontend} /> : children
}

export default PublicRoute;