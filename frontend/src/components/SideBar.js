import React, { useEffect, useRef } from 'react';
import '../styles/SideBar.module.css';
import { v4 as uuidv4 } from 'uuid';

const SideBar = ({ previousQueries, onRepeatQuery, open }) => {
    const sidebarRef = useRef(null);

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
            {previousQueries.length ? previousQueries.map(prevQuery => {
                return <button key={uuidv4()} onClick={() => onRepeatQuery(prevQuery)}>{prevQuery}</button>
            }) : <p>No queries.</p>}
        </aside>
    );
}

export default SideBar;