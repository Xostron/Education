import { Button, View, Text } from "react-native"
import { cls } from "./style.js"


export const Search = ({ navigation, route }) => {
	const t = route?.params?.data ?? "default"

	return (
		<View style={cls.container}>
			<Text>Поиск</Text>

			
		</View>
	)
}
