import { useState, useRef, useEffect } from "react";
import {CKEditor} from 'ckeditor4-react';
import { config } from "./fn";


const Cke = ({ value, set, height = "600px", width = "100%" }) => {
	let edi = useRef(null);
	const [ready, setReady] = useState();
	// console.log("render = ", value, ready);

	useEffect(() => {
		// console.log("effect = ", value, ready);
		if (value && ready) edi.current.setData(value);
	}, [value, ready]);

	return (
		<>
			<CKEditor
				style={{ margin: "auto" }}
				config={{
					height: height,
					width: width,
					...config,
				}}
				readOnly={false}
				onBlur={({ editor }) => {
					set(editor.getData());
				}}
				onInstanceReady={({ editor }) => {
					edi.current = editor;
					setReady(true);
					// console.log('instance = ', edi)
				}}
			/>
		</>
	);
};
export default Cke;
