import React from 'react'
import { ThemeProvider } from '@material-ui/core';
import { GlobalStateProvider } from './global/GlobalState'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import GlobalTheme from './global/GlobalTheme'
import GoTo from './widgets/GoTo'
import Sidebar from './Sidebar'
import ConditionalWidgetRendering from './ConditionalWidgetRendering'
import Popup from './widgets/Popup';

const Root = ({ map }) => {
    const defaultState = {
        map,
        mode: "dataExploration",
        chartingOpen: false,
        clusterLegendOpen: false,
        preloading: true,
        sidebarOpen: false,
        popupOpen: false
    }


    return <GlobalStateProvider defaultValue={defaultState}>
        <ThemeProvider theme={GlobalTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>

                <div id="current-location" className="current-location">
                    <GoTo />
                </div>

                <div>
                    <Sidebar/>
                </div>

                <ConditionalWidgetRendering/>

                <Popup />

            </MuiPickersUtilsProvider>
        </ThemeProvider>
    </GlobalStateProvider>
}

export default Root;