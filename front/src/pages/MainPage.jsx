import React from 'react'
import Grid from '../components/Grid';
import DropDown from '../components/UI/DropDown';
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
            <DropDown />
          </div>
          <Grid />



        </div>
      </div>
    </section>
  );
}
