import Sensor from '@cmp/sensor'
import Weather from '@cmp/weather'
import useEquipStore from '@store/equipment'
import useInputStore from '@store/input'
import { useShallow } from 'zustand/react/shallow'
import { checkS } from '@tool/sensor'

//Параметры улицы(погода, датчики)
export default function Outdoor() {
	const [build] = useEquipStore(({ build }) => [build()])
	const [getTotalBy, getFan, humAbs] = useInputStore(({ getTotalBy, getFan, input }) => [
		getTotalBy,
		getFan,
		input?.humAbs,
	])

	if (!build) return null

	// Внутри склада
	const sens = [
		// Температура потолка (мин) и Разгонный вентилятор
		{ type: 'tin', ...getTotalBy('tin', 'min', build?._id), fan: getFan(build?.fan?.[0]) },
		// Влажность продукта (макс)
		{ type: 'hin', ...getTotalBy('hin', 'max', build?._id) },
		// Абс влажность продукта
		{ type: 'calcMois', value: humAbs?.[build?._id] },
	]
	sens[2].state = checkS(sens?.[0]?.state, sens?.[1]?.state)

	return (
		<section className='outdoor'>
			<Weather />
			<Sensor data={sens} cls={'sens'} withImg={true} />
		</section>
	)
}
