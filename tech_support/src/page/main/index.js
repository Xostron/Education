import React, { useRef } from "react";
import style from "./style.module.css";
import  {Navbar,Cke}  from "../../components";


const cards = [
    { component: <Cke /> },
    { component: <Navbar /> },
    { component: <Navbar /> },
    { component: <Cke /> },
    { component: null },
    { component: null },
];


const Main = () => {
    return (
        <>
            <span className={style.title}>Компоненты</span>
            <div className={style.cards}>
                {cards.map((el, idx) => {
                    return (
                        <div key={idx} className={style.card}>
                            <object className={style.component}>
                                {el.component}
                            </object>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default Main;
