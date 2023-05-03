import React, { useEffect, useRef } from 'react';
import '../styles/SearchBar.module.css';

const SearchBar = ({ term, onChangeHandler, onSubmitHandler }) => {
    const inputSearchRef = useRef(null);

    useEffect(() => {
        inputSearchRef.current.focus();
    }, [])

    return(
        <form onSubmit={onSubmitHandler}>
            <input ref={inputSearchRef} type="search" placeholder="Enter search term here" onChange={onChangeHandler} value={term} />
            <input type="submit" value="Submit" />
        </form>   
    );
}

export default SearchBar;