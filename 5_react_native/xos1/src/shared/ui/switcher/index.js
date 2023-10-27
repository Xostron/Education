import { TouchableOpacity } from 'react-native'
import { GestureHandlerRootView, } from 'react-native-gesture-handler'

export default function Switcher({length, idx, setIdx}) {
	return (
		<GestureHandlerRootView style={{
			flexDirection: 'row',
			flex: 1
		}}>
			<TouchableOpacity
				style={{ width: '25%' }}
				activeOpacity={0}
				onPress={_ => prev(length, idx, setIdx)}
			/>
			<TouchableOpacity
				style={{ flex: 1 }}
				activeOpacity={0}
				onPress={_ => next(length, idx, setIdx)}
			/>
		</GestureHandlerRootView>
	)
}

function next(length, idx, setIdx) {
	if (idx + 1 === length) return setIdx(0)
	setIdx(idx + 1)
}

function prev(length, idx, setIdx) {
	if (idx === 0) return setIdx(length - 1)
	setIdx(idx - 1)
}