import {combineReducers, configureStore} from '@reduxjs/toolkit'
import showHeader from "./slices/showHeader";
import siteLanguage from "./slices/siteLanguage";
import typingType from "./slices/typingType";
import translator from "./slices/translator";
import instruction from "./slices/instruction";

export const store = configureStore({
    reducer: {
        showHeader: showHeader,
        siteLanguage: siteLanguage,
        typingType: typingType,
        translator: translator,
        instruction: instruction
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch