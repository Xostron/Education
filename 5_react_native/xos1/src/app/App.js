import { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Dimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font'
import Navigator from 'nav/tab.js'

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
				// await SplashScreen.preventAutoHideAsync()
				// начальная загрузка шрифтов, данных(API) и тд
				await Font.loadAsync(fonts)
				// await initial()
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}
		prepare()
	}, [])

	console.log('widthS', Dimensions.get('screen').width)
	console.log('heightS', Dimensions.get('screen').height)

	const {width, height} = Dimensions.get('window')
	console.log('width', width)
	console.log('height', height)
	// const onLayoutRootView = useCallback(async () => {
	// 	if (appIsReady) await SplashScreen.hideAsync()
	// }, [appIsReady])
	if (!appIsReady) return null
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<Navigator />
			</SafeAreaProvider>
			<StatusBar rstyle='auto' />
		</NavigationContainer>
	)
}
export default App

// function Header({ props }) {
// 	const { back, options, route, navigation } = props
// 	return (
// 		<View
// 			style={{
// 				backgroundColor: '#eee',
// 				height: 40,
// 				alignItems: 'center',
// 				flexDirection: 'row',
// 				paddingHorizontal: 10,
// 				// gap: 20,
// 			}}
// 		>
// 			{back?.title ? (
// 				<Button
// 					onPress={() => {
// 						navigation.goBack()
// 					}}
// 					icon={{
// 						source: 'arrow-left',
// 						direction: 'auto',
// 						color: 'ff1',
// 					}}
// 					style={{ color: '#1ff' }}
// 				></Button>
// 			) : (
// 				<View></View>
// 			)}
// 			<Text
// 				style={{
// 					color: '#444',
// 					fontWeight: 'bold',
// 					fontSize: 18,
// 				}}
// 			>
// 				{options?.title ?? ''}
// 			</Text>
// 		</View>
// 	)
// }

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
