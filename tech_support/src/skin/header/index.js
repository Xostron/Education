import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './style.css'

const links = [
    { name: "Главная", to: "/" },
    { name: "2 стр", to: "/about" },
];

export const Navbar = () => {
    return (
        <div className="header-inner">
            {links.map((l) => (
                <NavLink className='link' key={l.to} to={l.to}> {l.name} </NavLink>
            ))}
        </div>
    );
};
