import { StatusBar } from "expo-status-bar"
import { Text, View, Image } from "react-native"
import { Button } from "react-native-paper"
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
							header: (props) => <Header props={props} />,
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

function Header({ props }) {
	const { back, options, route, navigation } = props
	return (
		<View
			style={{
				backgroundColor: "#eee",
				height: 40,
				alignItems: "center",
				flexDirection: "row",
				paddingHorizontal: 10,
				// gap: 20,
			}}
		>
			{back?.title ? (
				<Button
					onPress={() => {
						navigation.goBack()
					}}
					icon={{source:"arrow-left", direction: 'auto', color:"ff1"}}
          style={{color:"#1ff"}}
				></Button>
			) : (
				<View></View>
			)}
			<Text
				style={{
					color: "#444",
					fontWeight: "bold",
					fontSize: 18,
				}}
			>
				{options?.title ?? ""}
			</Text>
		</View>
	)
}
