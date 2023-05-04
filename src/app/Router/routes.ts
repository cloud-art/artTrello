import IRouter from '../../types/IRouter';

import { HOMEPAGE_ROUTE } from '../../constants/routes'

import Homepage from '../../components/pages/Homepage';

export const publicRoutes: Array<IRouter> = [
    {
        path: HOMEPAGE_ROUTE,
        Component: Homepage
    },
];
