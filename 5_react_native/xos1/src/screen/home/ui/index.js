import { View, Text, Button } from "react-native"
import { cls } from "./style.js"
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Home = ({navigation}) => {
	return (
		<View style={cls.container}>
			<Text style={cls.text}>HOME SCREEN</Text>
            <Button onPress={()=>navigation.navigate('Catalog', {data:'hello'})} title='Catalog+'/>
		</View>
	)
}
