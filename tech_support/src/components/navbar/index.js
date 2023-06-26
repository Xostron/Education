import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";
import Moment from "react-moment";

const links = [
    { name: "Главная", to: "/" },
    { name: "О нас", to: "/about" },
    { name: "CKEditor", to: "/cke" },
];

const Navbar = () => {

    return (
        <>
            <div className={style.header}>
                <div className={style.left}>
                    <div className={style.logo} />
                    <div className={style.title}>QWERTY</div>
                </div>

                <div className={style.right}>
                    <div className={style.nav}>
                        {links.length
                            ? links.map((l) => (
                                  <NavLink
                                      className={style.link}
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
            <hr className={style.hr}/>
        </>
    );
};
export default Navbar;
