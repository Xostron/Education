import webpack from "webpack";
import { buildResolvers } from "./buildResolvers";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { BuildOptions } from "./types/config";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
	options: BuildOptions
): webpack.Configuration {
	const { paths, mode, isDev } = options;
	return {
		mode,
		entry: paths.entry,
		output: {
			filename: "[name][contenthash].js",
			path: paths.build,
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		// включение трассировщика ошибок в mode development
		devtool: isDev ? "inline-source-map" : false,
		// webpack-dev-server - автоматически перезапускает сборку
		devServer: isDev ? buildDevServer(options):undefined,
	};
}
