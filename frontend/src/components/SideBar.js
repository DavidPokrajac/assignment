import React, { useEffect, useRef } from 'react';
import '../styles/SideBar.module.css';
import { v4 as uuidv4 } from 'uuid';
import { AiFillCloseCircle } from "react-icons/ai";

const SideBar = ({ previousQueries, onRepeatQuery, onRemoveHandler, open }) => {
    const sidebarRef = useRef(null);

    const prevQueries = previousQueries.map(prevQuery => <button key={uuidv4()} onClick={() => onRepeatQuery(prevQuery)}>{prevQuery}</button>);

    useEffect(() => {
        if(open) {
            sidebarRef.current.style.left = '0';
            sidebarRef.current.style.transition = 'all 1s ease-in-out';
        } else {
            sidebarRef.current.style.left = '-200px';
        }
    }, [open])

    return(
        <aside className='sidebar' ref={sidebarRef}>
            <h2>Past queries</h2>
            {previousQueries.length ? prevQueries : <p>No queries.</p>}
            {previousQueries.length ? (
                <button onClick={onRemoveHandler}>
                    <AiFillCloseCircle />Remove All<AiFillCloseCircle />
                </button>
            ) : ''}
        </aside>
    );
}

export default SideBar;