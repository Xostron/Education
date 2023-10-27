import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { View, StyleSheet } from 'react-native'

const q1 = require('src/shared/assets/25.png')
const q2 = require('src/shared/assets/24.png')
const q3 = require('src/shared/assets/23.png')
const q4 = require('src/shared/assets/26.png')
const q = [q1, q2, q3, q4]

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

		0: { bottom: -70, right: -25 },
		1: { bottom: -25 },
		2: { right: -30 },
		3: { bottom: -50, right: -42, width:'110%' },
	},

	image: {
		flex: 1,
		// resizeMode:'contain'
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
