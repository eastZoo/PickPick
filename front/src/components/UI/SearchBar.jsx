import React from 'react'
import './SearchBar.css';

function SearchBar(props) {
  return (
    <input
      className={`searchbar ${props.className}`}
      placeholder={props.placeholder || "input 부탁드립니다 です"}
    >
      {props.children}
    </input>
  );
}

export default SearchBar