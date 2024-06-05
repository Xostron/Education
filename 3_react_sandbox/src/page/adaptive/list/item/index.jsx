import style from "./style.module.css"

export default function Item({data}) {
    console.log(data)
	return <div className={style.item}>
        {data.name}
        {data.desc}
        {data.heat}
        </div>
}
