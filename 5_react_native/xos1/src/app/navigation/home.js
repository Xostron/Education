import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import {Home} from 'src/screen/home'

const Stack = createStackNavigator()

export default function HomeStack() {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				name='HomeScreen'
				component={Home}
				options={{
					headerShown: false,
					title: 'Главная',
				}}
			/>
		</Stack.Navigator>
	)
}
