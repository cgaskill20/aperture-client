import React from 'react'
import { ThemeProvider } from '@material-ui/core';
import { GlobalStateProvider } from './global/GlobalState'
import GlobalTheme from './global/GlobalTheme'
import GoTo from './widgets/GoTo'
import ConditionalWidgetRendering from './ConditionalWidgetRendering'

const Root = ({ map }) => {
    const defaultState = {
        map,
        mode: "dataExploration",
        chartingOpen: false,
        clusterLegendOpen: false,
        preloading: true
    }

    return <GlobalStateProvider defaultValue={defaultState}>
        <ThemeProvider theme={GlobalTheme}>

            <div id="current-location" className="current-location">
                <GoTo />
            </div>

            <ConditionalWidgetRendering/>

        </ThemeProvider>
    </GlobalStateProvider>
}

export default Root;