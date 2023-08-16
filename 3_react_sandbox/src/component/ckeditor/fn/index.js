const toolbar = [
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

const config = {
	uiColor: "#FFFFFF",
	toolbarGroups: toolbar,
	extraPlugins: "editorplaceholder,colorbutton, justify,font",
	editorplaceholder: "Ответ...",
	removeButtons: "About,Scayt",
};

export { config };
