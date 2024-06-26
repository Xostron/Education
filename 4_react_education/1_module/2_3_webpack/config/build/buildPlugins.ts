import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from './types/config';

export function buildPlugins({paths}:BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		// прогресс сборки
		new webpack.ProgressPlugin(),
		// генерирование HTML с зависимостями или свой шаблон куда вставляются importы js
		new HtmlWebpackPlugin({
			template: paths.html
		}),
	];
}
