import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/Layout';
import { publicRoutes } from './routes';

function Router() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout />}>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    );
}

export default Router;
