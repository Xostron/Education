import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import { app } from "./styles"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "src/screen/home/ui"
import { Catalog } from "src/screen/catalog/ui"

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={app.container}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='Home'

						screenOptions={{
							header: (props) => {
                console.log(props)
								return (
									<View
										style={{
											backgroundColor: "#1ff",
											height: 50,
										}}
									></View>
								)},
              headerStyle:{backgroundColor:'#1ff'},
							headerTintColor: "#000",
							headerTitleStyle: {
								fontWeight: "bold",
							},
						}}
					>
						<Stack.Screen
							name='Home'
							component={Home}
							options={{
								title: "Главная",
							}}
						/>
						<Stack.Screen
							name='Catalog'
							component={Catalog}
							options={{
								title: "Каталог",
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar rstyle='auto' />
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

function LogoTitle() {
	return (
		<Image style={{ width: 50, height: 50 }} source={"src/shared/assets"} />
	)
}

// (props) => {
//   console.log(props)
//   return (
//     <View
//       style={{
//         backgroundColor: "#1ff",
//         height: 25,
//       }}
//     ></View>
//   )