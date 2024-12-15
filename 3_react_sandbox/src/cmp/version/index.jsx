function Version() {
	return (
		<div style={{ position: 'absolute', bottom: '15px', right: '15px', color: 'darkgray' }}>
			<p>server v2.0.3: {process.env.PUBLIC_SOCKET_URI}</p>
		</div>
	)
}
export default Version
