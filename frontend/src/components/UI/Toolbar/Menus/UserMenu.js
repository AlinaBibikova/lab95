import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">
                    <img src={user.avatar} alt="" className="mr-2"/>
                    Hello, {user.displayName}
                </span>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/cocktails/new">Add new cocktails</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/cocktails/mine">My cocktails</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;
