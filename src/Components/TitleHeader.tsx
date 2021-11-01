import React from 'react';

type headerText = {
    title: string;
    leading: string;
};

function TitleHeader({ title, leading }: headerText) {
    return (
        <header className='admin-header'>
            <h1>{title}</h1>
            <h6>{leading}</h6>
        </header>
    );
}

export default TitleHeader;
