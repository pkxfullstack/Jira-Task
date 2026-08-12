import { Box, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
	return (
		<Box>
			<Typography variant="h5" fontWeight="bold" mb={2}>
				Dashboard
			</Typography>

			<Grid container spacing={2}>
				{/* Card 1 */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="subtitle1">Total Tasks</Typography>
						<Typography variant="h4">12</Typography>
					</Paper>
				</Grid>

				{/* Card 2 */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="subtitle1">In Progress</Typography>
						<Typography variant="h4">5</Typography>
					</Paper>
				</Grid>

				{/* Card 3 */}
				<Grid size={{ xs: 12, md: 4 }}>
					<Paper sx={{ p: 2 }}>
						<Typography variant="subtitle1">Completed</Typography>
						<Typography variant="h4">7</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
