type Mods = Record<string, boolean | string>;

export function classname(
	cls: string,
	mods: Mods,
	additional: string[]
): string {
	return [
		cls,
		...additional,
		...Object.entries(mods)
			.filter(([key, val]) => val == true)
			.map(([key, val]) => key),
	].join(" ");
}
