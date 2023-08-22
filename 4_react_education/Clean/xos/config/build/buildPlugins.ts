import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildPlugins({
	paths,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		// прогресс сборки
		new webpack.ProgressPlugin(),
		// генерирование HTML при сборке с зависимостями по нашему шаблону
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		// плагин для генерации отдельного файла css при сборке,
		// также доп правила устанавливаются в loader
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css",
			chunkFilename: "css/[name].[contenthash].css",
		}),
	];
}
