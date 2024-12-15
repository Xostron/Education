import style from "./style.module.css"
import Header from "./header"
import List from "./list"
import LeftSide from "./sidebar/left"
import RightSide from "./sidebar/right"
import Input from "../../cmp/fields/input"

export default function Adaptive() {
	return (
		<section className={style.container}>
			<Header />
			<>
				<List data={def} />
				<Input value={10} setValue={()=>{}}/>
			</>
			<LeftSide />
			<RightSide />
		</section>
	)
}

const def = [
	{
		id: 1,
		name: "Стандартный пистолет",
		img: "./img/fallout/",
		desc: "",
		heat: 10,
	},
	{
		id: 1,
		name: "Ионный пистолет",
		img: "./img/fallout/",
		desc: "",
		heat: 10,
	},
]
