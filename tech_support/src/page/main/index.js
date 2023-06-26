import React, { useRef } from "react";
import style from "./style.module.css";
import { Cke, Navbar } from "../../components";

const cards = [
    { component: <Cke />, size: 800 },
    { component: <Navbar />, size: 800 },
    { component: <Cke />, size: 800 },
    { component: <Navbar />, size: 800 },
    { component: <Cke />, size: 800 },
    { component: <Navbar />, size: 800 },
    { component: <Cke />, size: 800 },
    { component: <Navbar />, size: 800 },
];
const cardSize = 370;

const Main = () => {
    return (
        <div className="container">
            <span className={style.title}>Компоненты</span>
            <div className={style.cards}>
                {cards.map((el, idx) => {
                    const scale = cardSize / el.size;
                    return (
                        <div key={idx} className={style.card}>
                            <div
                                style={{ scale: `${scale}` }}
                                className={style.component}
                            >
                                {el.component}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Main;
