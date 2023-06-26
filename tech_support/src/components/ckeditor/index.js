import React, { useRef,useEffect } from "react";
import { CKEditor } from "ckeditor4-react";

const Cke = ({ value, set ,size={width:10,height:10}}) => {
    const {width,height} = size
    let edi = useRef(null);
    useEffect(() => {
        value ? edi.current.setData(value) : console.log();
        console.log("@", value, edi);
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
                    height: width ?? "640px",
                    width: height ?? "776px",
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