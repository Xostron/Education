import './style.css'
import Sensor from '@cmp/sensor'
import Owner from './owner'
import Forecast from './fore'
import useEquipStore from '@store/equipment'
import useInputStore from '@store/input'
import { useShallow } from 'zustand/react/shallow'
import { checkS } from '@tool/sensor'

export default function Weather({}) {
	const [build] = useEquipStore(useShallow(({ build }) => [build()]))
	const [humAbs, getTotal] = useInputStore(({ input, getTotal }) => [input?.humAbs, getTotal])

	if (!build) return null

	const sens = [
		// Температура улицы - мин
		{ type: 'tout', ...getTotal('tout', 'min') },
		// Влажность улицы - max
		{ type: 'hout', ...getTotal('hout', 'max') },
		// Абсолютная влажность улицы
		{ type: 'calcMois', value: humAbs?.out },
	]
	sens[2].state = checkS(sens?.[0]?.state, sens?.[1]?.state)
	return (
		<section className='weather' style={{ backgroundImage: 'url(/img/weather.png)' }}>
			<Owner
				data={{ company: build.company, code: build.code, address: build?.pc?.address?.value }}
				cls='weather-owner'
			/>
			<Sensor data={sens} cls='weather-sens' />
			<Forecast address={build.company.address} cls='weather-fore' />
		</section>
	)
}
