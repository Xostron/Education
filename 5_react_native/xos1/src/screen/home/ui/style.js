import { StyleSheet } from "react-native"

const cls = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#eee",
		paddingHorizontal: 10,
		// alignItems:'center',
		// justifyContent:'center',
	},
	text: {
		color: "#000",
	},
	segment: {
		paddingVertical: 10,
		borderTop: 2,
		borderColor: "#000",
	},
	btn: {
		marginHorizontal: 15,
		backgroundColor: "#ffbae8",
		borderRadius: 16,
		borderColor: "transparent",
		borderTopRightRadius:16,
		borderBottomRightRadius:16,
		borderTopLeftRadius:16,
		borderBottomLeftRadius:16,
	},
	lbl: {
		color: "#fff",
	},
	btn_empty: {
		opacity: 0,
		pointerEvents: "none",
		maxWidth:0,
		minWidth:0
	},
	scrollView: {
		// height:
		backgroundColor:'#fff'
	},
})

export { cls }
