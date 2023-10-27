import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Chapter from 'src/shared/ui/chapter'
import Line from './line'

export default function Orders({ refresh }) {
	const navigation = useNavigation()

	return (
		<View>
			<Chapter title={'Мои заказы'} act={go} />
			<Line {...{refresh}}/>
		</View>
	)

	function go() {
		navigation.navigate('Orders')
	}
}
