// SafeAreaView позволяет вам создавать компоненты, которые автоматически
// учитывают safe areas в своем макете. Это особенно важно, когда речь идет
// о размещении компонентов в верхней или нижней части экрана, где могут
// находиться панели навигации, верхние панели состояния или панели жестов.
import { SafeAreaView } from 'react-native-safe-area-context'
import {
	View,
	StyleSheet,
	FlatList,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import { Image } from 'expo-image'
import { Text } from 'react-native-paper'
import { useCallback, memo } from 'react'
import { useTheme } from 'react-native-paper'
const q = [
	{ _id: 0, img: require('src/shared/assets/favicon.png'), title: '' },
	{ _id: 1, img: require('src/shared/assets/addressEmp.svg'), title: '' },
	{ _id: 2, img: require('src/shared/assets/order.svg'), title: '' },
	{ _id: 3, img: require('src/shared/assets/profile.svg'), title: '' },
	{ _id: 4, img: require('src/shared/assets/bonus.svg'), title: '' },
	{ _id: 5, img: require('src/shared/assets/addressEmp.svg'), title: '' },
	{ _id: 6, img: require('src/shared/assets/order.svg'), title: '' },
	{ _id: 7, img: require('src/shared/assets/profile.svg'), title: '' },
	{ _id: 8, img: require('src/shared/assets/bonus.svg'), title: '' },
]

const deviceWidth = Dimensions.get('window').width
const d = 88 / 3 / 100
const p = 0.02
const width = deviceWidth * d

const stl = StyleSheet.create({
	cntr: {
		flexGrow: 1,
		margin: deviceWidth * p,
		alignItems: 'center',
		// backgroundColor: '#f2f2f2',
	},
	wrp: {
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		height: width,
		borderRadius: 16,
		// backgroundColor: 'silver',
	},
	img: {
		width,
		height: width,
	},
	title: {
		flexShrink: 1,
		width,
		margin: 5,
		fontFamily: 'SemiBold',
		fontSize: 16,
		textAlign: 'center',
		// backgroundColor:'red',
	},
})

export const Home = ({ navigation }) => {
	const color = useTheme().colors.elevation.level1
	const bg = color ? { backgroundColor: color } : null
	const ri = useCallback(({ item }) => (
		<TouchableOpacity style={stl.cntr} onPress={(e) => console.log(e)}>
			<View style={[stl.wrp]}>
				<Image
					contentFit='contain'
					style={stl.img}
					source={item.img}
					transition={100}
				/>
			</View>
			<Text style={[stl.title]} numberOfLines={2} ellipsizeMode='tail'>
				{item.title ?? ''}
			</Text>
		</TouchableOpacity>
	))
	return (
		<FlatList
			data={q}
			renderItem={ri}
			keyExtractor={(item) => item._id}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			// onRefresh={load}
			// refreshing={fetching}
			contentContainerStyle={{ flexGrow: 1 }}
			// ListHeaderComponent={lhc}
			ListEmptyComponent={null}
		/>
	)
}
