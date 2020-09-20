import React from 'react';
import './Header.css';
import logo from '../../Image/Logo.png'

const Header = () => {
    return (
        <div >
            <nav>
                <img className="logo" style={{marginTop:"10px"}}src={logo} alt=""/>
                <ul>
                    <li><a href="/news">News</a></li>
                    <li><a href="/destination">Destination</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <a href="/login"><button style={{backgroundColor:"orange", border:"none", borderRadius:"2px"}}>Login</button></a> 
                </ul>
            </nav> 
        </div>
    );
};

export default Header;