import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import {Search} from 'src/screen/search'

const Stack = createStackNavigator()

export default function SearchStack() {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				name='Search'
				component={Search}
				options={{
					headerShown: false,
					title: 'Поиск',
				}}
			/>
		</Stack.Navigator>
	)
}