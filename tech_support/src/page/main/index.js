import React, { useRef } from "react";
import style from "./style.module.css";
import { Cke, Navbar } from "../../components";
// width='730px' height='600px'
const cards = [
    { component: <Cke /> },
    { component: <Navbar /> },
    { component: <Navbar /> },
    { component: <Cke /> },
    { component: null },
    { component: null },
];
const cardSize = 300;

const Main = () => {
    return (
        <div className="container">
            <span className={style.title}>Компоненты</span>
            <div className={style.cards}>
                {cards.map((el, idx) => {
                    const scale = cardSize / el.size;
                    return (
                        <div key={idx} className={style.card}>
                            <object className={style.component}>
                                {el.component}
                            </object>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Main;
