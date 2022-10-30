import {combineReducers, configureStore} from '@reduxjs/toolkit'
import showHeader from "./slices/showHeader";

const rootReducer = combineReducers({
    showHeader: showHeader
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch