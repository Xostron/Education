import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useEquipStore from '@store/equipment'
import useOutputStore from '@store/output'
import useInputStore from '@store/input'
import { sProduct } from '@socket/emit'
import defImg from '@tool/icon'
import Data from './data'
import Line from './line'
import Title from './title'
import Footer from './footer/inde'
import './style.css'

// Модальное окно: вкл/выкл склад
export default function Entry({ close }) {
	const { build } = useParams()
	const { setStart, setAutomode } = useOutputStore()
	const [automode, start, product] = useInputStore(({ input }) => [
		input?.retain?.[build]?.automode,
		input?.retain?.[build]?.start,
		input?.retain?.[build]?.product,
	])
	const [prdList] = useEquipStore(({ prdList }) => [prdList(build)])

	const bStart = start ? 'Выкл.' : 'Вкл.'
	// Текущий режим
	const [am, setAm] = useState(automode)
	// Текущий продукт
	const [pr, setPr] = useState(product?.name ?? null)

	useEffect(() => {
		setAm(automode)
	}, [automode])

	useEffect(() => {
		setPr(product?.name)
	}, [product])

	// Список продуктов
	const aProd = prdList?.map((el) => ({
		title: el.name,
		code: defImg.product[el.name].code,
		img: defImg.product[el.name].img,
	}))
	// Список режимов
	const aAm = Object.values(defImg.automode)
	return (
		<div className='entry'>
			<Title />
			<span className='line3'>
				<Line name='' type='automode' data={am} setData={actAutomode} list={aAm} />
				<Line name='' type='product' data={pr} setData={actProduct} list={aProd} />
			</span>
			<Data />
			<Footer name={bStart} act1={action} act2={cancel} act3={cancel} />
		</div>
	)

	// Кнопка Вкл/выкл склад
	function action() {
		setStart({ _id: build, val: !start })
		close()
	}

	// Кнопка выбрать product
	function actProduct(val) {
		const prod = prdList?.find((el) => el.name === defImg.product[val].title)
		setPr(val)
		sProduct({ buildingId: build, ...prod })
	}
	// Кнопка выбрать режим автоуправления
	function actAutomode(val) {
		setAutomode({ _id: build, val: val })
		setAm(val)
	}
	// Кнопка Отмена
	function cancel() {
		close()
	}
}
