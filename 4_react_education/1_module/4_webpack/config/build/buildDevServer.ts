import { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


// webpack-dev-server - это простой веб-сервер, который автоматически перезапускает сборку проекта
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
        open:true
	};
}
