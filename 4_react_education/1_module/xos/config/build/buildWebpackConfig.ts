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
			rules: buildLoaders(),
		},
		resolve: buildResolvers(),
		// включение трассировщика ошибок в mode development
		devtool: isDev ? "inline-source-map" : false,
		devServer: isDev ? buildDevServer(options):undefined,
	};
}
