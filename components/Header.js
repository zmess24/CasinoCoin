import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
    state = {  }
    render() {
        return (
            <Menu inverted>
                <Menu.Item name="logo">
                    <img src="/static/logo.jpg" />
                </Menu.Item>
                <Menu.Item name="Casi">CasinoCoin</Menu.Item>
            </Menu>
        );
    }
}

export default Header;