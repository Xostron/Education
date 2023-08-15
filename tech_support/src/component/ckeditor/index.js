import React, { useRef, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import { config } from "./fn";

const Cke = ({ value, set, height = "600px", width = "100%" }) => {
	let edi = useRef(null),
		flag = "";
	useEffect(() => {
		value && flag ? edi.current.edi.setData(value) : console.log();
	}, [value, flag]);
console.log('@@@ = ',flag)
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
					edi.current = { flag: true };
					edi.current.edi = editor;
					flag = JSON.stringify(edi.current, ["flag","edi"]);
				}}
			/>
		</>
	);
};
export default Cke;
