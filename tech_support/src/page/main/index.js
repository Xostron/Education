import React, { useState, useRef, useMemo,useEffect } from "react";
import JoditEditor from "jodit-react";

export const Main = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    useEffect(()=>{console.log('==',content)},[content])
    const config = useMemo(()=>(
		{
			readonly: false,
			placeholder: '...',
            height:400,
		}),
		[]
	);

    return (
        <div>
            <JoditEditor 
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
        </div>
    );
};
