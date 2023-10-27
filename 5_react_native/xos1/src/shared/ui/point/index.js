import { Animated, View } from 'react-native'

import { usePoint } from './style'

export default function Point({ idx, arr }) {
	const stl = usePoint()
	return (
		<View style={stl.container}>
			{arr.map((el, index) =>
				<View
					key={`bar${index}`}
					style={
						[
							index === idx ? stl.currenPoint : stl.point,
							index === 0 ? stl.firstPoint : {}
						]
					}
				>
					<Animated.View style={index === idx ? stl.currentAnim : stl.anim}/>
				</View>
			)}
		</View>
	)
}