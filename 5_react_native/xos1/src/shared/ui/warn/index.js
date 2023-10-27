import { useTheme } from 'react-native-paper'
import Toast from 'react-native-root-toast'
// всплывающее сообщение предупреждение
export default function useWarn() {
	const color = useTheme().colors
	const backgroundColor = color.error
	const textColor = color.onError
	return ( msg, pos) => {
		if (!msg) return null
		msg = msg.toString()
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
