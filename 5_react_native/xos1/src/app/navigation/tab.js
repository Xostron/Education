import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'src/shared/ui/icon'
import HomeStack from './home'
import SearchStack from './search'
import FavoriteStack from './favorite'
import UserStack from './user'

const Tab = createBottomTabNavigator()

export default function TabNav() {
	return (
		<Tab.Navigator initialRouteName={'Catalog'} screenOptions={{}}>
			<Tab.Screen
				name='Home'
				component={HomeStack}
				options={{
					title: 'Главная',
					tabBarIcon: ({ color, size, focused }) => (
						<Icon
							name={focused ? 'homeon' : 'homeoff'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={SearchStack}
				options={{
					title: 'Поиск',
					tabBarIcon: ({ color, size, focused }) => (
						<Icon
							name={focused ? 'search' : 'search'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Favorite'
				component={FavoriteStack}
				options={{
					title: 'Избранное',
					tabBarIcon: ({ color, size, focused }) => (
						<Icon
							name={focused ? 'likeon' : 'likeoff'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='User'
				component={UserStack}
				options={{
					title: 'Поиск',
					tabBarIcon: ({ color, size, focused }) => (
						<Icon
							name={focused ? 'profilon' : 'profiloff'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}
