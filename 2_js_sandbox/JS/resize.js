	// отслеживание размера области
	useEffect(() => {
		window.addEventListener('resize', resize)
		resize()
		return () => {
			window.removeEventListener('resize', resize)
		}
	}, [])

	// изменение размера gap
	function resize() {
		const { clientWidth } = container.current || {}
		const count = Math.trunc((clientWidth - minGap) / (whItem + minGap))
		container.current.style.columnGap =
			(minGap + (clientWidth + minGap - count * (whItem + minGap)) / (count - 1)).toFixed(1) - 0.1 + 'px'
		console.log('@resize')
	}

	const whItem = 109
const minGap = 5