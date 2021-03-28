import { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import { Menu } from 'antd';

class Header extends Component {


    render() {
        return (
            <header className="MainHeader">
                <div className="logo"></div>
                <nav className="gnb">
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <Link to="/"><a>Home</a></Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about"><a>About</a></Link>
                        </Menu.Item>
                        
                        <Menu.Item key="Problems">
                            <Link to="/problems"><a>Problems</a></Link>
                        </Menu.Item>
                    </Menu>
                </nav>

                <div className="login">
                </div>
            
            </header>
        );
    }

}


export default Header;