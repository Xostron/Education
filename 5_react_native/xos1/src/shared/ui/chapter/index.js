import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import {stl} from './style'
// заголовок раздела и кнопка 'все'
export default function Chapter({ title, act }) {
	if (!title) return null
	return (
		<View style={stl.wrp}>
			<Text style={stl.title}>{title}</Text>
			{!!act && (
				<TouchableOpacity onPress={act}>
					<Text style={stl.act}>все</Text>
				</TouchableOpacity>
			)}
		</View>
	)
}
