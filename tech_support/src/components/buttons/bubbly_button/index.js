import style from "./style.module.css";

function animateButton(e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove(style.animate);

    e.target.classList.add(style.animate);
    setTimeout(function () {
        e.target.classList.remove(style.animate);
    }, 700);
}

const Bbtn = ({ setActive }) => {
    return (
        <button
            onClick={(e) => {
                animateButton(e);
                setActive?.((prev)=>!prev)
            }}
            className={style.bubbly_button}
        >
            Click me!
        </button>
    );
};

export default Bbtn;
