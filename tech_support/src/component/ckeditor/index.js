import React, { useRef, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import { config } from "./fn";

let flag = "";

const Cke = ({ value, set, height = "600px", width = "100%" }) => {
	let edi = useRef(null);
	
	console.log("render = ", value, flag);

    // init content
	useEffect(() => {
		console.log("effect = ", value, flag);
		value && flag ? edi.current.edi.setData(value) : console.log();
	}, [value,flag]);

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
					flag = JSON.stringify(edi, ["current", "flag"]);
					console.log("Ready = ", flag);
				}}
			/>
		</>
	);
};
export default Cke;
