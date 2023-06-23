import React, { useState, useRef, useMemo, useEffect } from "react";
import { CKEditor, useCKEditor } from "ckeditor4-react";
import { Cke } from "../../components/ckeditor";

export const CKE = () => {
    const [content, setContent] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        console.log("==", content);
    }, [content]);
setTimeout(()=>{
    setText('<p>Hello its me</p>')
},2000)
    return (
        <>
            <p>CKEditor</p>
            {
            <Cke value={text} set={setContent}/>
        }
            </>
    );
};
