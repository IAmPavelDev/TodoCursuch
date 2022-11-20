import React from "react";
import { NavLink } from "react-router-dom";//ссылки по роутам, которые задавали в App.js
import style from "./Nav.module.scss";

const Nav = () => {
    return (
        <div className={style.wrapper}>
            <NavLink
                to={"/"}
                className={({ isActive }) => isActive ? style.activeLink : null}
            >Items</NavLink>
            <NavLink
                to={"/users"}
                className={({ isActive }) => isActive ? style.activeLink : null}
            >Users</NavLink>
        </div>
    )
}

export default Nav;