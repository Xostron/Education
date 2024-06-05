import style from "./style.module.css"

export default function Header() {
	return (
		<header className={style.header}>
			<img src='./img/logo.png' />
			<span>FALLOUT</span> 
		</header>
	)
}
