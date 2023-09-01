import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { BuildOptions } from "./types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

export function buildPlugins({
	paths,
	isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	const plugins = []
	if (isDev || true) {
		plugins.push(new webpack.HotModuleReplacementPlugin())
		plugins.push(new ReactRefreshWebpackPlugin())
		// анализатор размера бандла - визуализация в виде дерева
		plugins.push(new BundleAnalyzerPlugin())
	}
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
		// делаем глобальную переменную (для использования в коде)
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		}),
		...plugins,
	]
}
