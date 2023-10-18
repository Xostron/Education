import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import {Favorite} from 'src/screen/favorite'

const Stack = createStackNavigator()

export default function FavoriteStack() {
	return (
		<Stack.Navigator initialRouteName='Favorite'>
			<Stack.Screen
				name='Favorite'
				component={Favorite}
				options={{
					headerShown: false,
					title: 'Избранное',
				}}
			/>
		</Stack.Navigator>
	)
}
