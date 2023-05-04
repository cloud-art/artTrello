import React, { FC, ReactComponentElement, ReactNode } from 'react';

export default interface IRouter {
    path: string;
    Component: React.FC;
}
