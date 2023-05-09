import React from 'react';

export interface IBoardItem {
    id: number;
    title: string;
}

export interface IBoard {
    id: number;
    title: string;
    items: Array<IBoardItem>;
}
