import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import path from "path";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
	options: BuildOptions
): webpack.Configuration {
	const { paths, mode, isDev } = options;
	return {
		// режим сборки: development - production
		mode: mode,
		// точка входа
		entry: paths.entry,
		// путь сохранения сборки и имя сборки
		output: {
			filename: "[name].[contenthash].js",
			path: paths.build,
			clean: true,
		},
		// плагины:
		plugins: buildPlugins(options),
		// загрузчики: преобразуют файлы
		module: {
			rules: buildLoaders(options),
		},
		// расширерения файлов
		resolve: buildResolvers(),
		// source maps - при сборке проекта, трассировщик стека
		// сможет отслеживать ошибку/предупреждение до исходного файла
		// по - умолчанию трассировщик при ошибке ссылается на общую сборку bundle.js
		devtool: isDev ? "inline-source-map" : undefined,
		// webpack-dev-server - автоматически перезапускает сборку
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}
