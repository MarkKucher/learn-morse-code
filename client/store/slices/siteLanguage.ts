import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

interface siteLanguageState {
    selected: string,
    languages: string[]
}

const initialState: siteLanguageState = {
    selected: 'ua',
    languages: ['ua', 'en', 'ru']
}

const siteLanguageSlice = createSlice({
    name: 'siteLanguage',
    initialState,
    reducers: {
        selectSiteLanguage: (state, action: PayloadAction<string>) => {
            state.selected = action.payload
        },
        selectLanguages: (state, action: PayloadAction<string[]>) => {
            state.languages = action.payload
        }
    }
})

export const {selectSiteLanguage, selectLanguages} = siteLanguageSlice.actions;
export const selectSiteLanguageState = (state: RootState) => state.siteLanguage;
export default siteLanguageSlice.reducer;