import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

type selectedLanguageType = 'ua' | 'ru' | 'en';

interface siteLanguageState {
    selected: selectedLanguageType,
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
        selectSiteLanguage: (state, action: PayloadAction<selectedLanguageType>) => {
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