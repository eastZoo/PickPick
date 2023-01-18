import React from 'react'
import logo from '../../images/main.png'
import { FaYoutube, FaTwitch, FaGithub, FaReact } from 'react-icons/fa';
import './Footer.css'
import Button from '../UI/Button';
import SearchBar from '../UI/SearchBar';;

const Footer = () => {

  return (
    <footer>
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__main">
            <h1>Enjoy, more youtube</h1>
            <div className="search">
              <SearchBar className="footer__search" placeholder="Search for YouTube keywords" />
              <Button className="footer__btn">Search</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="subfooter__wrapper">
          <a href="/">
            <img src={logo} alt="PICKPICK" width="220px" />
          </a>
          <div className="subfooter__menu">
            <ul className="menu">
              <li>Main</li>
              <li>Youtube</li>
              <li>Contact</li>
              <li>About Us</li>
            </ul>
          </div>
          <div>
            <ul className="subfooter__icon">
              <li><FaYoutube /></li>
              <li><FaTwitch /></li>
              <li><FaGithub /></li>
              <li><FaReact /></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer