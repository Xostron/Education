import { createStackNavigator } from '@react-navigation/stack'

import Welcome from 'src/screen/welcome'

const Stack = createStackNavigator()

export default function BasketStack() {
	return (
		<Stack.Navigator initialRouteName="Welcome">
			<Stack.Screen name="Welcome" component={Welcome} options = {{headerShown: false}} />
		</Stack.Navigator>
	)
}