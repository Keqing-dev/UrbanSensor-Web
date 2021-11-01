import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AlertDispatchToProps } from '../Redux/Actions/AlertAction';
import { AlertState } from '../Redux';
import { IconButton, Snackbar } from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';

function Alert({ isActive, message, setAlertAct }: any) {
    const [open, setOpen] = React.useState(isActive);

    useEffect(() => {
        setOpen(isActive);
    }, [isActive]);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setAlertAct({ isActive: false, message: null });
    };

    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => {
                    setAlertAct({ isActive: false, message: null });
                }}
            >
                <Unicons.UilTimes />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </>
    );
}

export default connect(AlertState, AlertDispatchToProps)(Alert);
