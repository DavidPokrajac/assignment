import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from './components';
import { SideBar } from './components';
import { SearchResults } from './components';
import './App.css';
import axios from 'axios';
import { FiArrowRight } from 'react-icons/fi';

const storedItems = JSON.parse(localStorage.getItem('previous-searches')) || [];

const App = () => {
  const [term, setTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [previousQueries, setPreviousQueries] = useState(storedItems);
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    if(isOpen) {
      buttonRef.current.style.left = '225px';
      buttonRef.current.style.transform = 'rotate(180deg)';
      buttonRef.current.style.transition = 'all 1s ease-in-out';
      buttonRef.current.title = 'Close the sidebar';
    }
    else {
      buttonRef.current.style.left = '100px';
      buttonRef.current.style.transform = 'rotate(0deg)';
      buttonRef.current.title = 'View past queries';
    }
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('previous-searches', JSON.stringify(previousQueries))
  }, [previousQueries]);
  
  const letterChangeHandler = (event) => {
    setTerm(event.target.value)
  }

  const onSidebarHandler = () => {
    setIsOpen(!isOpen);
  }

  const submitQueryHandler = (event) => {
    event.preventDefault();

    if(term === '') return;

    setPreviousQueries(prevQueries => [...prevQueries, term]);

    const options = {
      method: 'GET',
      url: 'http://localhost:5000/api',
      params: {level: term},
    }

    axios.request(options).then((response) => {
      const { RelatedTopics } = response.data;
      const mainTopics = RelatedTopics.filter(r => !r.Topics);
      const subTopics = RelatedTopics.filter(r => r.Topics);
      setSearchResults(
        subTopics.length === 0 ? 
          [...mainTopics] : 
          [...mainTopics, ...subTopics[0]['Topics']]
      );
    }).catch((error) => {
        console.log(error);
    });
  }

  const onRepeatQuery = (value) => {
    setTerm(value);
  
    const options = {
      method: 'GET',
      url: 'http://localhost:5000/api',
      params: {level: value},
    }

    axios.request(options).then((response) => {
      const { RelatedTopics } = response.data;
      const mainTopics = RelatedTopics.filter(r => !r.Topics);
      const subTopics = RelatedTopics.filter(r => r.Topics);
      setSearchResults(
        subTopics.length === 0 ? 
          [...mainTopics] : 
          [...mainTopics, ...subTopics[0]['Topics']]
      );
    }).catch((error) => {
      console.log(error);
    });
  }

  const removeAllQueries = () => {
    localStorage.removeItem('previous-searches');
    setPreviousQueries([]);
  }

  return (
    <>
      <SearchBar term={term} onChangeHandler={letterChangeHandler} onSubmitHandler={submitQueryHandler} />
      <SearchResults searchResults={searchResults} term={term} />
      <button ref={buttonRef} className='see-past' onClick={onSidebarHandler}><FiArrowRight /></button>
      <SideBar open={isOpen} previousQueries={previousQueries} onRepeatQuery={onRepeatQuery} onRemoveHandler={removeAllQueries} />
    </>
  );
}

export default App;
