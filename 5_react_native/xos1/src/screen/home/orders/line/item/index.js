import { useState } from 'react'
import { Dimensions, View } from 'react-native'

import Image from './image'
import Info from './info'

export default function Item({ item }) {
	const [idx, setIdx] = useState(0)
	const deviceWidth = Dimensions.get('window').width
	const width = deviceWidth * 0.28
	return (
		<View style={{ width, marginRight: 5 }}>
			<Image item={item} idx={idx} setIdx={setIdx} width={width}/>
			<Info item={item} idx={idx}/>
		</View>
	)
}

