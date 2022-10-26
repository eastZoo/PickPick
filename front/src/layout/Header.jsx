import React from 'react'
import logo from '../images/main.png'
import InputForm from '../components/UI/InputForm'
import './Header.css'

export default function Header() {
  const handleKeyword = () => {

  }
  return (
    <header>
      <nav>
        <div className="container">
          <div className="left">
            <a href="/" class="main__logo">
              <img src={logo} alt="PICKPICK" width="220px" />
            </a>
            <InputForm />
          </div>
          <div className="right">
            <ul className="right__menu">
              <li className="item">
                <div className="item__name">
                  Home
                  <div class="material-icons">keyboard_arrow_down</div>
                </div>
                <div className="item__contents">
                  <div className="content__menu">
                    <ul className="inner">
                      <li>Test 1</li>
                      <li>Test 2</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="item__name">
                  Favorite
                  <div class="material-icons">keyboard_arrow_down</div>
                </div>
                <div className="item__contents">
                  <div className="content__menu">
                    <ul className="inner">
                      <li>Test 1</li>
                      <li>Test 2</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="item__name">
                  Youtube
                  <div class="material-icons">keyboard_arrow_down</div>
                </div>
                <div className="item__contents">
                  <div className="content__menu">
                    <ul className="inner">
                      <li>Test 1</li>
                      <li>Test 2</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="item__name">
                  Hot
                  <div class="material-icons">keyboard_arrow_down</div>
                </div>
                <div className="item__contents">
                  <div className="content__menu">
                    <ul className="inner">
                      <li>Test 1</li>
                      <li>Test 2</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div className="write_btn">
              <button className="btn">
                <span className="write_text">Sharing joy</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
