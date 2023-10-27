import { useTheme } from 'react-native-paper'


export function usePoint() {
	const bg = { backgroundColor: useTheme().colors.elevation.level5 }
	const bgCurrent = { backgroundColor: useTheme().colors.onSurface }

	return {
		container: {
			position: 'absolute',
			flexDirection: 'row',
			bottom: 7,
			left: 7,
			zIndex: 2,
			alignItems: 'center'
		},
		firstPoint: {
			marginLeft: 0
		},
		point: {
			overflow: 'hidden',
			borderRadius: 8,
			height: 6,
			width: 6,
			marginLeft: 7
		},
		currenPoint: {
			overflow: 'hidden',
			borderRadius: 8,
			height: 6,
			width: 6,
			marginLeft: 7
		},
		anim: {
			position: 'absolute',
			borderRadius: 8,
			width: 6,
			height: 6,
			left: 0,
			top: 0,
			...bg
		},
		currentAnim: {
			position: 'absolute',
			borderRadius: 8,
			width: 6,
			height: 6,
			left: 0,
			top: 0,
			...bgCurrent
		}
	}

}