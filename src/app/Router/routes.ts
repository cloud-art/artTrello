import IRouter from '../../types/IRouter';

import { HOMEPAGE_ROUTE } from '../../utils/consts';

import Homepage from '../../components/Pages/Homepage';

export const authRoutes: Array<IRouter> = [];
export const publicRoutes: Array<IRouter> = [
    {
        path: HOMEPAGE_ROUTE,
        Component: Homepage
    },
];
