import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";
import Moment from "react-moment";

const links = [
    { name: "Главная", to: "/" },
    { name: "О нас", to: "/about" },
    { name: "CKEditor", to: "/cke" },
];
// подстветка активного состояния для NavLink
function activeStyle({ isActive }) {
    return isActive ? style.link + " " + style.link_a : style.link;
}

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    console.log("@ = menu", menu);
    const styleBar = menu ? style.bar + " " + style.bar_a : style.bar;
    return (
        <>
            <div className={style.header}>
                <div className={style.left}>
                    <div className={style.bar_w} onClick={() => {
                                setMenu((prev) => !prev);
                            }}>
                        <div
                            className={styleBar}
                            
                        />
                    </div>
                    <div className={style.logo} />
                    <div className={style.title}>QWERTY</div>
                </div>

                <div className={style.right}>
                    <div className={style.nav}>
                        {links.length
                            ? links.map((l) => (
                                  <NavLink
                                      className={activeStyle}
                                      key={l.to}
                                      to={l.to}
                                  >
                                      {l.name}
                                  </NavLink>
                              ))
                            : ""}
                    </div>

                    <span className={[style.btn, style.moment].join(" ")}>
                        <Moment
                            format="DD.MM.YYYY, HH:mm:ss"
                            interval={1000}
                            title="Текущее время"
                        />
                    </span>
                </div>
            </div>
            <hr className={style.hr} />
        </>
    );
};
export default Navbar;
