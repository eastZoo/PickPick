import React from 'react'
import logo from '../images/main.png'
import InputForm from '../components/InputForm'
import './Header.css'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

export default function Header() {
  const handleKeyword = () => {

  }
  return (
    <header>
      <nav>
        <div className="container">
          <div className="left">
            <Link to="/" class="main__logo">
              <img src={logo} alt="PICKPICK" width="220px" />
            </Link>
            <InputForm />
          </div>
          <div className="right">
            <ul className="right__menu">
              <li className="item">
                <Link to="/" className="item__name">
                  Home
                </Link>
              </li>
              <li className="item">
                <Link to="/favorite" className="item__name">
                  Favorite
                </Link>
              </li>
              <li className="item">
                <Link to="/hot" className="item__name">
                  Hot
                </Link>
              </li>
              <li className="item">
                <div className="item__name">
                  Youtube
                  <div class="material-icons">keyboard_arrow_down</div>
                </div>
                <ul className="item__contents">
                  <li>
                    <a href="https://www.youtube.com/user/woowakgood">
                      Woowakgood
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/c/%EB%A6%B4%EC%B9%B4Lilka">
                      Lilka
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A">
                      BLACKPINK
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A">
                      BANGTANTV
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <Link to="/login" className="write_btn">
              <Button className="header__btn">Login</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
