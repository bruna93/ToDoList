import Box from '@mui/material/Box';

export function Header() {
	const headerStyle = {
		background: "var(--violet)",
		paddingTop: "2rem",

		"div": {
			maxWidth: "1120px",
			margin: "0 auto",

			padding: "2rem 1rem 12rem",

			display: "flex",
			alignItems: "center",
			justifyContent: "center",

			"h2": {
				color: "white",
				fontWeight: "lighter",
				
				"span": {
					fontSize: "25px",
					fontWeight: "bold",
				}
			}
		}
	}

	return (
		<Box component="header" sx={headerStyle}>
			<Box>
				<h2>to.<span>do</span></h2>
			</Box>
		</Box>
	)
}