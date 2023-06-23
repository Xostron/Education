import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";

const links = [
    { name: "Jodit", to: "/jodit" },
    { name: "TinyMCE", to: "/mce" },
    { name: "CKEditor", to: "/cke" },
];

export const Navbar = () => {
    return (
        <div className="header">
            <div className="left">
                <div className="logo" />
                <div className="title">QWERTY</div>
            </div>

            <div className="right">
                <div className="nav">
                    {links.length
                        ? links.map((l) => (
                              <NavLink className="link" key={l.to} to={l.to}>
                                  {l.name}
                              </NavLink>
                          ))
                        : ""}
                </div>
                
                <span className="btn moment">
                    <Moment
                        format="DD.MM.YYYY, HH:mm:ss"
                        interval={1000}
                        title="Текущее время"
                    />
                </span>
            </div>
        </div>
    );
};
