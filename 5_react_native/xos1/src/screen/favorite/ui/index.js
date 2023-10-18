import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { cls } from './style.js'


export const Favorite = ({ navigation }) => {
	const [value, setValue] = useState('')

	return (
		<View style={cls.container}>
			<Text>Избранное</Text>
		</View>
	)
}


