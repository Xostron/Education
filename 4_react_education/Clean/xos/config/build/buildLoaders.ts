import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const svgLoader={
		test: /\.svg$/i,
        use: ['@svgr/webpack'],
	}
	const fileLoader = {
		test: /\.(png|jpe?g|gif|webp|ico|woff2?|eot|ttf|otf)$/i,
		use: [
			{
				loader: "file-loader",
			},
		],
	}
	// порядок loaders имеет значение, поэтому выносим каждый лоадер в отдельную переменную
	// преобразует typescript файлы в js понятный браузеру
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};
	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// в режиме prod генерируем отдельный файл css для build
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// подключаем import module,
			// генерация имен стилей: dev - полное имя, prod - хэшированное имя
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) =>
							Boolean(resPath.includes(".module.")),
						localIdentName: isDev
							? "[path][name]__[local]"
							: "[hash:base64:8]",
					},
				},
			},
			// Compiles Sass to CSS
			"sass-loader",
		],
	};
	return [typescriptLoader, cssLoader, svgLoader,fileLoader];
}
