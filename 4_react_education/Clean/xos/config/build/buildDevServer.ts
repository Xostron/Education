import webpack from "webpack"
import { BuildOptions } from "./types/config"
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
		// автоматически открывает страницу в браузере
		open: true,
		// доступ к dev-server с произвольного url
		historyApiFallback: true,
		hot: true,
	}
}
