const toolbar = [
	{ name: 'clipboard', groups: ['undo', 'clipboard'] },
	{ name: 'editing', groups: ['spellchecker'] },
	{ name: 'links', groups: ['links'] },
	{ name: 'insert', groups: ['insert'] },

	{ name: 'tools', groups: ['tools'] },
	{ name: 'colors' },
	{
		name: 'paragraph',
		groups: ['list', 'indent','blocks'],
	},
	{ name: 'document', groups: ['mode'] },
	'/',
	{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
	{
		name: 'paragraph',
		groups: ['align'],
	},
	{ name: 'styles', groups: ['styles'] },
]

const config = {
	uiColor: '#FFFFFF',
	toolbarGroups: toolbar,
	extraPlugins: 'editorplaceholder,colorbutton, justify,font',
	editorplaceholder: '...',
	removeButtons: 'About,Subscript,Superscript,Anchor',
}

export { config }
