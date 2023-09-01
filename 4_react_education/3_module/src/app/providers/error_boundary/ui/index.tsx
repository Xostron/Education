import React, { ErrorInfo, ReactNode, Suspense } from "react"
import { PageError } from "widgets/page_error"

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, info)
	}

	render() {
		const { children } = this.props
		const { hasError } = this.state

		if (hasError) {
			return (
				<Suspense fallback={""}>
					<PageError />
				</Suspense>
			)
		}
		return children
	}
}

export default ErrorBoundary
