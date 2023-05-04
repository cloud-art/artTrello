import React from 'react'

interface SearchProps {
    classname?: string;
}

const Search: React.FC<SearchProps> = ({ classname }) => {
    return (
        <div className={classname}>Search</div>
    )
}

export default Search