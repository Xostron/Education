import Toast from 'react-native-root-toast'
import { useTheme } from 'react-native-paper'
// всплывающее сообщение
export default function useNotice() {
	const color = useTheme().colors
	const backgroundColor = color.primary
	const textColor = color.onPrimary
	return ( msg, pos) => {
		if (!msg) return null
		pos = pos ?? -55
		msg = typeof msg === 'string' ? msg : Array.isArray(msg) ? msg.join('\n') : JSON.stringify(msg)
		Toast.show( msg, {
			opacity: 1,
			duration: Toast.durations.LONG,
			position: pos,
			backgroundColor,
			textColor,
			textStyle: {fontSize: 16 },
		})
	}
}
