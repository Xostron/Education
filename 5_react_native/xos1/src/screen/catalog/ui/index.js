import { Button, View, Text } from "react-native"
import { cls } from "./style.js"

export const Catalog = ({ navigation, route }) => {
	const t = route?.params?.data ?? "default"
	console.log(route)
	return (
		<View style={cls.container}>
			<Text style={cls.text}>CATALOG SCREEN {t}</Text>
			<Button onPress={() => navigation.push("Catalog")} title='Again' />
			<Button
				title='Go to Home'
				onPress={() => navigation.navigate("Home")}
			/>
			<Button title='Go back' onPress={() => navigation.goBack()} />
			<Button
				title='Update the title'
				onPress={() => navigation.setOptions({ title: "Updated!" })}
			/>
		</View>
	)
}
