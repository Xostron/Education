import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'src/shared/ui/icon'
import HomeStack from './home'
import SearchStack from './search'
import FavoriteStack from './favorite'
import UserStack from './user'

const Tab = createBottomTabNavigator()

export default function TabNav() {
	const isAuth = true
	return (
		<Tab.Navigator initialRouteName={'HomeTab'} screenOptions={{}}>
			<Tab.Screen
				name='HomeTab'
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
					// При показе экрана приветсвия откл. нижние табы и заголовок
					// также заголовок необходимо отключить в Stack.Navigation
					tabBarStyle: isAuth ? {} : { display: 'none' },
					headerShown: isAuth 
				}}
			/>
			<Tab.Screen
				name='SearchTab'
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
				name='FavoriteTab'
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
				name='UserTab'
				component={UserStack}
				options={{
					title: 'Профиль',
					tabBarIcon: ({ color, size, focused }) => (
						<Icon
							name={focused ? 'profilon' : 'profiloff'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			{/* <Tab.Screen
				name='WelcomeTab'
				component={WelcomeStack}
				
				options={{
					headerShown:false,
					tabBarStyle:{display:'none'},
					tabBarIconStyle:{display:'none'}
				}}
			/> */}
		</Tab.Navigator>
	)
}
