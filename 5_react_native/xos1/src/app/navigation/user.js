import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import {User} from 'src/screen/user'

const Stack = createStackNavigator()

export default function UserStack() {
	return (
		<Stack.Navigator initialRouteName='User'>
			<Stack.Screen
				name='User'
				component={User}
				options={{
					headerShown: false,
					title: 'Профиль',
				}}
			/>
		</Stack.Navigator>
	)
}
