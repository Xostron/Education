import style from "./style.module.css";
import {useRef} from 'react'

function animateButton(ref) {
    if (ref.classList.length===1) {
       ref.classList.add(style.bar_a)
    }else{
        ref.classList.remove(style.bar_a)
    }
}

const Mbtn = ({ setActive }) => {
    const refAnim = useRef()

    return (
        <button
            className={style.bar_w}
            onClick={(e) => {
                animateButton(refAnim.current);
                setActive?.((prev) => !prev);
            }}
        >
            <div className={style.bar} ref={refAnim}/>
        </button>
    );
};

export default Mbtn;
