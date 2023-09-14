import { useState } from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { cls } from "./style.js"
import { SegmentedButtons } from "react-native-paper"
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Home = ({ navigation }) => {
	const [value, setValue] = useState("")
	console.log('value', value)
	return (
		<View style={cls.container}>
			<ScrollView style={cls.scrollView} horizontal={true}>
				<SegmentedButtons
					value={value}
					onValueChange={setValue}
					style={cls.segment}
					buttons={[
						{
							value: "walk",
							label: "Walking",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "train",
							label: "Transit",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "drive",
							label: "Driving",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "1",
							label: "1",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "2",
							label: "2",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "3",
							label: "3",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "4",
							label: "4",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "5",
							label: "5",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "6",
							label: "6",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
						{
							value: "7",
							label: "7",
							style: cls.btn,
							labelStyle: cls.lbl,
							showSelectedCheck: true,
						},
					]}
				/>
			</ScrollView>
			<Text style={cls.text}>HOME SCREEN</Text>
			<Button
				onPress={() =>
					navigation.navigate("Catalog", { data: "hello" })
				}
				title='Catalog+'
			/>
		</View>
	)
}

function wrapper() {
	return <View></View>
}
