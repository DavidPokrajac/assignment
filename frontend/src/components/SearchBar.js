import React, { useEffect, useRef } from 'react';
import '../styles/SearchBar.module.css';
import { v4 as uuidv4 } from 'uuid';

const SearchBar = ({ term, onChangeHandler, onSubmitHandler, searchResults }) => {
    const inputSearchRef = useRef(null);

    useEffect(() => {
        inputSearchRef.current.focus();
    }, [])

    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <input ref={inputSearchRef} type="search" placeholder="Enter search term here" onChange={onChangeHandler} value={term} />
                <input type="submit" value="Submit" />
                <ul>
                    {searchResults.map(result => {
                        const { Result } = result;
                        return(
                            <li key={uuidv4()} dangerouslySetInnerHTML={{__html: Result}} />
                        );
                    })}
                </ul>
            </form>
        </>
    );
}

export default SearchBar;