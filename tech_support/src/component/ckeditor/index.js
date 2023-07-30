import React, { useRef,useEffect,useState } from "react";
import { CKEditor,useCKEditor } from "ckeditor4-react";
const toolbarGroups = [
    { name: "clipboard", groups: ["undo", "clipboard"] },
    {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
    },
    { name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    { name: "forms", groups: ["forms"] },
    { name: "tools", groups: ["tools"] },
    { name: "styles", groups: ["styles"] },
    { name: "document", groups: ["mode", "document", "doctools"] },
    "/",
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    { name: "colors" },
    {
        name: "paragraph",
        groups: ["list", "indent", "blocks", "align"],
    },
];
const Cke = ({ value, set ,height='600px', width='100%'}) => {
    // let edi = useRef(null);
    // const [flag,setFlag]=useState(false)
    
    // useEffect(() => {
    //     console.log('edi.current = ', edi.current)
    //     if (value)  edi.current.setData(value) 
    // }, [flag]);
useCKEditor(()=>{
    console.log('@@@')
},[])
    return (
        <>
            <CKEditor
                style={{ margin: "auto" }}
                config={{
                    height: height,
                    width: width,
                    uiColor: "#FFFFFF",
                    toolbarGroups: toolbarGroups,
                    extraPlugins: "editorplaceholder,colorbutton, justify,font",
                    editorplaceholder: "Ответ...",
                    removeButtons: "About,Scayt",
                }}
                readOnly={false}
                onBlur={({ editor }) => {
                    set(editor.getData());
                }}
                // onInstanceReady={({ editor }) => {
                //     edi.current = editor;
                //     setFlag(true)
                // }}
            />
        </>
    );
};
export default Cke