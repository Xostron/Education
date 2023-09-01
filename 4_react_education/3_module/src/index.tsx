import { render } from "react-dom"
import App from "./app/App"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "app/providers/theme_providers"
import "./shared/config/i18n"
import { ErrorBoundary } from "app/providers/error_boundary"

render(
	<BrowserRouter>
		<ErrorBoundary>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ErrorBoundary>
	</BrowserRouter>,

	document.getElementById("root")
)
