import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { cls } from './style.js'

export const User = ({ navigation }) => {
	const [value, setValue] = useState('')

	return (
		<View style={cls.container}>
			{/* <ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={refresh}
						onRefresh={(_) => setRefresh(true)}
					/>
				}
			></ScrollView> */}
			<Text>Профиль</Text>
		</View>
	)
}
