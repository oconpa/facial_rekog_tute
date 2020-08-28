import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import DrawerStep from './DrawerStep'

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <DrawerStep />
                <Typography variant="subtitle1" color="inherit">
                Machine Learning (AI) Face Recogontion Web App
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default NavBar;