import { StatusBar } from 'expo-status-bar'
// splachScreen - предоставляет инструменты для
// создания красивых и информативных экранов загрузки
// в ваших приложениях React Native.
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import {
	MD3DarkTheme,
	MD3LightTheme,
	PaperProvider,
	adaptNavigationTheme,
} from 'react-native-paper'
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'

// тема
import { light, dark } from './styles/colors'
const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
})
import Icon from 'src/shared/ui/icon'
import Navigator from './navigation/tab'

// шрифты и иконки
const fonts = {
	Regular: require('src/shared/assets/fonts/Inter-Regular.ttf'),
	Medium: require('src/shared/assets/fonts/Inter-Medium.ttf'),
	Bold: require('src/shared/assets/fonts/Inter-Bold.ttf'),
	SemiBold: require('src/shared/assets/fonts/Inter-SemiBold.ttf'),
	mpIco: require('src/shared/assets/fonts/GreelanIcon.ttf'),
	// 'mpIcoSVG': require('src/shared/assets/fonts/GreelanIcon-SVG.ttf'),
}

function App() {
	const [appIsReady, setAppIsReady] = useState(false)
	useEffect(() => {
		async function prepare() {
			try {
				// отключить автоскрытие экрана загрузки
				await SplashScreen.preventAutoHideAsync()

				// выполняем предварительную загрузку данных:
				// начальная загрузка шрифтов, данных(API) и тд
				await Font.loadAsync(fonts)
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}
		prepare()
	}, [])

	// включаем скрытие экрана загрузки, после того как все данные готовы
	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) await SplashScreen.hideAsync()
	}, [appIsReady])

	// const scheme = 'dark'
	const scheme = useColorScheme()

	if (!appIsReady) return null

	const theme = {
		...(scheme === 'light' ? MD3LightTheme : MD3DarkTheme),
		colors: scheme === 'light' ? light : dark,
	}

	LightTheme.colors.card = light.elevation.level2
	LightTheme.colors.background = light.background
	LightTheme.colors.primary = light.primary

	return (
		// обертка для навигации, предоставляет контекст
		// (стек навигации, конфигурацию, и навигационные потоки)
		// для навигационных компонентов
		<NavigationContainer
			theme={scheme === 'light' ? LightTheme : DarkTheme}
		>
			{/* оболочка для темизации и стилизации в стиле Material Design от Google
			<PaperProvider> - устанавливает Material-UI контекст в вашем приложении, 
			что позволяет другим компонентам из Material-UI использовать 
			темы и стили, определенные в PaperProvider. */}
			<PaperProvider
				theme={theme}
				settings={{
					icon: (props) => <Icon {...props} />,
				}}
			>
				{/* SafeAreaProvider определяет безопасные области 
				(область экрана которая не перекрывается элементами ОС)
				 для верхней и нижней частей экрана и позволяет вам настраивать 
				 отступы и позицию компонентов внутри безопасных областей. */}
				<SafeAreaProvider>
					{/* splash screen - экран загрузки */}
					<View onLayout={onLayoutRootView} />
					{/* Навигация - NavigationTab + NavigationScreen */}
					<Navigator />
				</SafeAreaProvider>
			</PaperProvider>
			<StatusBar rstyle='auto' />
		</NavigationContainer>
	)
}
export default App

{
	// const linking = {
	// 	prefixes: [prefix],
	// }
	/* <Stack.Navigator
						initialRouteName='Home'
						screenOptions={{
							header: (props) => <Header props={props} />,
						}}
					>
						<Stack.Screen
							name='Home'
							component={Home}
							options={{
								title: 'Главная',
							}}
						/>
						<Stack.Screen
							name='Catalog'
							component={Catalog}
							options={{
								title: 'Каталог',
							}}
						/>
					</Stack.Navigator> */
}
