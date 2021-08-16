import React from 'react'
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

export default () => {
    return (
        <AppBar style={{ backgroundColor: "#1a1a1a" }}>
            <Typist
                cursor={{
                    show: true,
                    blink: true,
                }}
                className="HeaderTitle">
                <Typist.Delay ms={500} />
                Uniquify
            </Typist>
        </AppBar>
    )
}
