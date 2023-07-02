import style from './style.module.css'

const animateButton = function(e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove(style.animate);
    
    e.target.classList.add(style.animate);
    setTimeout(function(){
      e.target.classList.remove(style.animate);
    },700);
  };
  


const Bbtn = ()=>{
    return(
        <button onClick={animateButton} className={style.bubbly_button}>Click me!</button>
    )
}

export default Bbtn