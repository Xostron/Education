import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Info({ item, idx }) {
	const navigation = useNavigation()
	const name = { color: '#828282' }
	const str = item.product[idx].name
	return (
		<TouchableOpacity onPress={go}>
			<Text style={{fontSize: 16, fontFamily: 'SemiBold' }}>№ {item.num}</Text>
			<Text style={[name, { flexGrow: 1, fontSize: 12 }]} numberOfLines={1} textBreakStrategy='highQuality'>{str}</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 4}}>				
				<Text style={[name, { fontSize: 12, }]}>{item.product[idx].value + item.product[idx].unit}</Text>
				<View style={{ flexDirection: 'row', alignItems: 'baseline'}}>
					<Text style={{ fontSize: 16, fontFamily: 'SemiBold'  }}>{item.product[idx].sum}</Text>
					<Text style={{ fontSize: 12, fontFamily: 'SemiBold'  }}>{'₽'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)

	function go() {
		navigation.navigate('Order', {_id: item._id, name: item.num, status: item.status.code})
	}
}