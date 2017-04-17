import React from 'react';
import style from './index.scss';
import Menus from './menus';
class Sidebar extends React.Component {
    
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState(){
        return {
            sidebarStyle: {
                height:window.innerHeight,
                float: 'left',
                width: 200,
                borderRight: '1px solid #ddd',
                position: 'fixed'
            }
        };
    }
    render(){
        return (
            <div id="sidebar" style={this.state.sidebarStyle}>
                <ul className="menu-items">
                    {Menus.map((menu, index) => {
                        return <li key={index} className={this.props.path === menu.path ? "menu-item active" : "menu-item" }><a href={menu.path}>{menu.title}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}
export default Sidebar;