import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { cls } from './style.js'


export const User = ({ navigation }) => {
	const [value, setValue] = useState('')

	return (
		<View style={cls.container}>
			<Text>Профиль</Text>
		</View>
	)
}


