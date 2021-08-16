import React from 'react'
import Typewriter from 'typewriter-effect';
import styled from 'styled-components';
import { Header, Anchor, Text } from 'grommet';
import { Aggregate } from 'grommet-icons';
// const StyledText = styled(Text)`
// `

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const HeaderLabel = <Typewriter
    onInit={(typewriter) => {
        typewriter.typeString('Uniquify')
            .start();
    }}
/>
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Uniquify
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
        // <Header pad="medium" height="xsmall" color='white'>
        //     <Anchor
        //         href="/"
        //         icon={<Aggregate color="white" />}
        //         label={HeaderLabel}
        //     />
        //     <StyledText>Menu</StyledText>
        // </Header>
    )
}
