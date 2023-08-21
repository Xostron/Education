import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {
	// порядок loaders имеет значение, поэтому выносим каждый лоадер в отдельную переменную
	// преобразует typescript файлы в js понятный браузеру
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};
	return [typescriptLoader];
}