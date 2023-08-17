import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {
	// порядок loaders имеет значение, поэтому выносим каждый лоадер в отдельную переменную
	// - преобразует typescript файлы в js понятный браузеру
	// - если не исполльзуем typescript (а пишем на нативном js) - нужен babel-loader
	// который преобразует новый js в старый понятный всем браузерам
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};
	const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
	return [typescriptLoader, sassLoader];
}
