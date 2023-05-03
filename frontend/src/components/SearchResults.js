import React from 'react';
import '../styles/SearchResults.module.css';
import { v4 as uuidv4 } from 'uuid';

const SearchResults = ({ searchResults }) => {
    return(
        <ul>
            {searchResults.map(result => {
                const { Result } = result;
                return(
                    <li key={uuidv4()} dangerouslySetInnerHTML={{__html: Result}} />
                );
            })}
        </ul>
    );
}

export default SearchResults;