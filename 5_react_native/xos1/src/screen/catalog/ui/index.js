import { Button, View, Text } from "react-native"
import { cls } from "./style.js"
import * as Linking from 'expo-linking';
export const Catalog = ({ navigation, route }) => {
	const t = route?.params?.data ?? "default"

	return (
		<View style={cls.container}>
			<Text style={cls.text}>CATALOG SCREEN {t}</Text>
			{/* <Button onPress={() => navigation.push("Catalog")} title='Again' />
			<Button
				title='Go to Home'
				onPress={() => navigation.navigate("Home")}
			/>
			<Button title='Go back' onPress={() => navigation.goBack()} />
			<Button
				title='Update the title'
				onPress={() => navigation.setOptions({ title: "Updated!" })}
			/> */}
			<Text
				style={{ color: 'white' }}
				onPress={() => Linking.openURL(`${Linking.createURL('')}/--/Home`)}
			>
				HOME
			</Text>
		</View>
	)
}
