import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import { Home } from 'src/screen/home'
import Welcome from 'src/screen/welcome'

const Stack = createStackNavigator()

export default function HomeStack() {
	const initScreen = true ? 'Home' : 'Welcome'
	return (
		<Stack.Navigator initialRouteName={initScreen}>
			{/* Экран приветсвия с отключенным заголовком*/}
			<Stack.Screen
				name='Welcome'
				component={Welcome}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					title: 'Главная',
				}}
			/>
		</Stack.Navigator>
	)
}
