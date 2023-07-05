import React, { useRef } from "react";
import style from "./style.module.css";
import { Navbar, Cke, Bbtn, Mbtn } from "../../components";

const cards = [
    { component: <Cke />, scale: 0.225, pointerEvents: "none" },
    { component: <Navbar />, scale: 0.225, pointerEvents: "none" },
    { component: <Bbtn />, scale: 0.7 },
    { component: <Mbtn />, scale: 1 },
    { component: null },
    { component: null },
];


console.log('web-worker', 'Worker' in window)
console.log('service-worker','serviceWorker' in navigator)
console.log('pushManager', 'PushManager' in window)

const Main = () => {
    return (
        <>
            <span className={style.title}>Компоненты</span>
            <div className={style.cards}>
                {cards.map((el, idx) => {
                    return (
                        <div key={idx} className={style.card}>
                            <object
                                className={style.component}
                                style={{
                                    scale: el.scale + "",
                                    pointerEvents: el.pointerEvents,
                                }}
                            >
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
