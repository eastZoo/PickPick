import React from 'react'
import './MainPage.css'

export default function MainPage() {
  return (
    <section className="mainpage">
      <div className="mainpage__wrapper">
        <div className="subhead__wrapper">
          <div className="subheader">
            <h1>SHARED</h1>
          </div>
        </div>
        {/* 검색 카테고리 */}
        <div className="main__content">
          <div className="main__content__wrapper">
            <div className="search">
              <input placeholder="search YouTube here..." />
              <button>
                <span class="material-icons">search</span>
              </button>
            </div>
            {/* 드롭다운 1 */}
            <div className="dropdown">
              <button className="dropbtn">
                All categories
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
          </div>
        </div>
      </div>
    </section>
  );
}
