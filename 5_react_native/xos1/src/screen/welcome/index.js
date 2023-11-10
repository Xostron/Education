import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { View, StyleSheet } from 'react-native'

const q = [
	// require('src/shared/assets/25.png'),
	// require('src/shared/assets/24.png'),
	// require('src/shared/assets/23.png'),
	// require('src/shared/assets/26.png'),
]



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
		height: 280,
		borderRadius: 16,
		overflow: 'hidden',
	},
	wrapper: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		// backgroundColor: 'red',
		0: { bottom: -90, right: -55, width: '150%' },
		1: { bottom: -25, left: -15, width: '120%', height: '120%' },
		2: { right: -50, bottom: -70, width: '140%', height: '140%' },
		3: { bottom: -50, right: -42 },
	},

	image: {
		flex: 1,
		resizeMode: 'contain',
	},
})

export default function Welcome({ navigation }) {
	return (
		<SafeAreaView style={styles.screen}>
			{/* список приветсвий */}

			{q.map((el, idx) => (
				<View key={idx} style={styles.container}>
					<View style={[styles.wrapper, styles.wrapper[`${idx}`]]}>
						<Image style={styles.image} source={el} />
					</View>
				</View>
			))}
		</SafeAreaView>
	)
}
