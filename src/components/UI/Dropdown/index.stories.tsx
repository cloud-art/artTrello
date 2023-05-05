import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ButtonDefault from '../ButtonDefault'
import DropDown from '.';

const meta: Meta<typeof DropDown> = {
    title: 'DropDown',
    component: DropDown,
};
export default meta;

type Story = StoryObj<typeof DropDown>;

const DropDownStory = () => {

    return <DropDown width='600' buttonContent={
        <ButtonDefault>
            button
        </ButtonDefault>
    }>
        some info
    </DropDown>;
};

export const Default: Story = {
    render: () => <DropDownStory />,
};