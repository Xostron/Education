import { ImageBackground } from 'react-native'

import { urlImg } from 'src/app/local/init'
import Switcher from 'src/shared/ui/switcher'
import Point from 'src/shared/ui/point'

export default function Image({ item, idx, setIdx, width }) {
	return (
		<ImageBackground
			source={{ uri: urlImg(item.product[idx].img[0]) }}
			resizeMode='contain'
			style={{ width, height: width }}
		>
			<Switcher length={item.product.length} idx={idx} setIdx={setIdx} />
			{item.product.length > 1 && <Point arr={item.product} idx={idx} />}
		</ImageBackground>
	)
}
