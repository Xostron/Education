import style from "./style.module.css"
import Item from './item'

export default function List({data}) {
    console.log(111, data.length)
    if (!data.length) return null
	return (
		<section className={style.list}>
			{data.map((el, i) => (
				<Item key={i} data={el} />
			))}
		</section>
	)
}
