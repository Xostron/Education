import React, { useRef,useEffect } from "react";
import { CKEditor } from "ckeditor4-react";

const Cke = ({ value, set ,height='600px', width='70%'}) => {
    let edi = useRef(null);
    useEffect(() => {
        value ? edi.current.setData(value) : console.log();
    }, [value]);
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
                // initData={"...Загружается"}
                readOnly={false}
                onBlur={({ editor }) => {
                    set(editor.getData());
                }}
                onInstanceReady={({ editor }) => {
                    edi.current = editor;
                }}
                
            />
        </>
    );
};
export default Cke