import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPlugins({paths}:BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		// прогресс сборки
		new webpack.ProgressPlugin(),
		// генерирование HTML с зависимостями или свой шаблон куда вставляются importы js
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		// гененрирование файла CSS
		new MiniCssExtractPlugin({
			filename:'css/[name].[contenthash].css',
			chunkFilename:'css/[name].[contenthash].css'
		})
	];
}
