import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DragAndDrop from '.';

const meta: Meta<typeof DragAndDrop> = {
    title: 'DragAndDrop',
    component: DragAndDrop,
};
export default meta;

type Story = StoryObj<typeof DragAndDrop>;

const DragAndDropStory = () => {

    return <DragAndDrop ></DragAndDrop>;
};

export const Default: Story = {
    render: () => <DragAndDropStory />,
};