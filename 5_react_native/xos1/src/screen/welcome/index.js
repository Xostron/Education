import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { View, StyleSheet } from 'react-native'

const q1 = require('src/shared/assets/25.png')
const q2 = require('src/shared/assets/24.png')
const q3 = require('src/shared/assets/23.png')
const q4 = require('src/shared/assets/26.png')

const styles = StyleSheet.create({
	screen: {
		flexGrow: 1,
		backgroundColor: 'silver',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		padding: 10,
	},
	container: {
		backgroundColor: 'white',
		width: '48%',
		height: 300,
		borderRadius: 16,
	},
	image: {
		flex: 1,

		// width:'100%',
		// position:'absolute',
		// bottom:'50',
		// right:100
	},
})

export default function Welcome({ navigation }) {
	return (
		<SafeAreaView style={styles.screen}>
			{/* список приветсвий */}

			<View style={styles.container}>
				<Image style={styles.image} contentFit='contain' source={q1} />
			</View>
			<View style={styles.container}>
				<Image style={styles.image} contentFit='contain' source={q2} />
			</View>
			<View style={styles.container}>
				<Image style={styles.image} contentFit='contain' source={q3} />
			</View>
			<View style={styles.container}>
				<Image style={styles.image} contentFit='contain' source={q4} />
			</View>
		</SafeAreaView>
	)
}
