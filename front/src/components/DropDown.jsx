import React from 'react'

const DropDown = () => {
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">
          All categories
          <span class="material-icons">keyboard_arrow_down</span>
        </button>
        <div className="dropdown-content">
          <a href="/">Woowakgood</a>
          <a href="/">Lilka</a>
          <a href="/">lion</a>
        </div>
      </div>
      {/* 드롭다운 1 */}
      <div className="dropdown">
        <button className="dropbtn">
          User
          <span class="material-icons">keyboard_arrow_down</span>
        </button>
        <div className="dropdown-content">
          <a href="/">profile</a>
          <a href="/">write a post</a>
          <a href="/">settings</a>
        </div>
      </div>
      {/* 드롭다운 1 */}
      <div className="dropdown">
        <button className="dropbtn">
          All Times
          <span class="material-icons">keyboard_arrow_down</span>
        </button>
        <div className="dropdown-content">
          <a href="/">profile</a>
          <a href="/">write a post</a>
          <a href="/">settings</a>
        </div>
      </div>
    </>
  );
}

export default DropDown