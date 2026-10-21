import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: React.ReactNode;
    content: React.ReactNode;
    action: React.ReactNode;
}

const Modal = ({ open, onClose, title, content, action }: ModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions> {action}</DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default Modal