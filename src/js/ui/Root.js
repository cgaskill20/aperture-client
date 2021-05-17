import React from 'react'
import { ThemeProvider } from '@material-ui/core';
import { GlobalStateProvider } from './global/GlobalState'
import GlobalTheme from './global/GlobalTheme'
import GoTo from './GoTo'

const Root = ({ map }) => {
    const defaultState = {
        map
    }
    
    return <GlobalStateProvider defaultValue={defaultState}>
        <ThemeProvider theme={GlobalTheme}>
            <div id="current-location" className="current-location">
                <GoTo />
            </div>
        </ThemeProvider>
    </GlobalStateProvider>
}

export default Root;