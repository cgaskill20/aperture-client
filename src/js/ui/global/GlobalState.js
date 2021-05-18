import React, { createContext, useState, useContext } from "react";

const GlobalStateContext = createContext([ {}, {} ]);

export const GlobalStateProvider = ({children, defaultValue = {}}) => {
    const [ globalState, setCompleteGlobalState ] = useState(defaultValue);
    const setGlobalState = (update) => {
        const newState = {
            ...globalState,
            ...update
        };
        setCompleteGlobalState(newState);
    }

    return (
        <GlobalStateContext.Provider value={[ globalState, setGlobalState ]}>
          {children}
        </GlobalStateContext.Provider>
    );
}

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateContext");
    }
    return context;
};