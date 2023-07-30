import React, { useState, useRef, useMemo, useEffect } from "react";
import { CKEditor, useCKEditor } from "ckeditor4-react";
import { Cke } from "../../component";

const CKE = () => {
    const [content, setContent] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        console.log("==", content);
    }, [content]);
    setTimeout(() => {
        setText("<p>Api text</p>");
    }, 0);
    return (
        <div className="container">
            <Cke value={text} set={setContent} />
        </div>
    );
};

export default CKE;
