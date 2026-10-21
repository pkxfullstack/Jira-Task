import { Box, Typography } from '@mui/material';
import React from 'react'

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
    return (
        <Box className="page-header" sx={{
            mb: 5,
            display: "flex",
            justifyContent: "space-between"
        }}>
            <Box>
                <Typography variant="h5" fontWeight={600}>{title}</Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >{description}</Typography>
                )}
            </Box>
            {action && <Box>{action}</Box>}
        </Box>
    )
}

export default PageHeader