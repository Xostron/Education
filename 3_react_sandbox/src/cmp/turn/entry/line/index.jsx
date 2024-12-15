import Choise from '@cmp/fields/choise'
import defImg from '@tool/icon'

function Line({ name, type, data, setData, list }) {
	return (
		<div className='line'>
			<p>{name}</p>
			<Choise data={data} setData={setData} list={list} />

			<div className='line2'>
				<img src={defImg?.[type]?.[data]?.img} />
				<p>{defImg?.[type]?.[data]?.title}</p>
			</div>
		</div>
	)
}

export default Line
