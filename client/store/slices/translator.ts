import {uaMorse} from "../../utils/morse-code-ua";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {MorseCodeType} from "../../utils/morse-code-language";

export type singleChar = {value: string, isHighlighted?: boolean, isTranslated?: boolean};

interface translatorState {
    sentence: singleChar[];
    translation: singleChar[];
    reversedArray: singleChar[];
    highlightedCouple: number[];
    isWriting: boolean;
    isForbiddenKeyPressed: boolean;
    isFocused: boolean;
    translationRelationships: MorseCodeType;
    isTranslationVisible: boolean;
    textToCheck: string[];
    correctIndexes: number[];
    accuracy: number;
    shouldShowResult: boolean;
}

const initialState: translatorState = {
    sentence: [{value: '|', isHighlighted: false}],
    translation: [],
    reversedArray: [{value: '|', isHighlighted: false}],
    highlightedCouple: [],
    isWriting: false,
    isForbiddenKeyPressed: false,
    isFocused: false,
    translationRelationships: uaMorse,
    isTranslationVisible: true,
    textToCheck: ['|'],
    correctIndexes: [],
    accuracy: 0,
    shouldShowResult: false
}

const translatorSlice = createSlice({
    name: 'translator',
    initialState,
    reducers: {
        setSentence: (state, action: PayloadAction<singleChar[]>) => {
            state.sentence = action.payload
        },
        setTranslation: (state, action: PayloadAction<singleChar[]>) => {
            state.translation = action.payload
        },
        setReversedArray: (state, action: PayloadAction<singleChar[]>) => {
            state.reversedArray = action.payload
        },
        setHighlightedCouple: (state, action: PayloadAction<number[]>) => {
            state.highlightedCouple = action.payload
        },
        setIsWriting: (state, action: PayloadAction<boolean>) => {
            state.isWriting = action.payload
        },
        setIsForbiddenKeyPressed: (state, action: PayloadAction<boolean>) => {
            state.isForbiddenKeyPressed = action.payload
        },
        setIsFocused: (state, action: PayloadAction<boolean>) => {
            state.isFocused = action.payload
        },
        setTranslationRelationships: (state, action: PayloadAction<MorseCodeType>) => {
            state.translationRelationships = action.payload
        },
        setIsTranslationVisible: (state, action: PayloadAction<boolean>) => {
            state.isTranslationVisible = action.payload
        },
        setTextToCheck: (state, action: PayloadAction<string[]>) => {
            state.textToCheck = action.payload
        },
        setCorrectIndexes: (state, action: PayloadAction<number[]>) => {
            state.correctIndexes = action.payload
        },
        setAccuracy: (state, action: PayloadAction<number>) => {
            state.accuracy = action.payload
        },
        setShouldShowResult: (state, action: PayloadAction<boolean>) => {
            state.shouldShowResult = action.payload
        }
    }
})

export const {setSentence,  setTranslation,
    setTranslationRelationships, setIsForbiddenKeyPressed, setHighlightedCouple,
    setIsFocused, setReversedArray, setIsWriting, setIsTranslationVisible,
    setTextToCheck, setCorrectIndexes, setAccuracy, setShouldShowResult
} = translatorSlice.actions;
export const selectTranslator = (state: RootState) => state.translator;
export default translatorSlice.reducer;