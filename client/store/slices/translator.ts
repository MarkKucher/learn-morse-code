import {uaMorse} from "../../utils/morse-code-ua";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {enMorse} from "../../utils/morse-code-en";
import {ruMorse} from "../../utils/morse-code-ru";

export type singleChar = {value: string, isHighlighted?: boolean, isTranslated?: boolean};

interface translatorState {
    sentence: singleChar[];
    prevSentence: singleChar[];
    translation: singleChar[];
    prevTranslation: singleChar[];
    reversedArray: singleChar[];
    highlightedCouple: number[];
    isWriting: boolean;
    isForbiddenKeyPressed: boolean;
    isFocused: boolean;
    translationRelationships: typeof uaMorse | typeof enMorse | typeof ruMorse;
    prevReversedArray: singleChar[];
    isTranslationVisible: boolean;
    textToCheck: string[];
    correctIndexes: number[];
    accuracy: number;
    shouldShowResult: boolean;
    shouldAutoTranslate: boolean;
}

const initialState: translatorState = {
    sentence: [{value: '|', isHighlighted: false}],
    prevSentence: [{value: '|', isHighlighted: false}],
    translation: [],
    prevTranslation: [],
    reversedArray: [{value: '|', isHighlighted: false}],
    highlightedCouple: [],
    isWriting: false,
    isForbiddenKeyPressed: false,
    isFocused: false,
    translationRelationships: uaMorse,
    prevReversedArray: [{value: '|', isHighlighted: false}],
    isTranslationVisible: true,
    textToCheck: ['|'],
    correctIndexes: [],
    accuracy: 0,
    shouldShowResult: false,
    shouldAutoTranslate: true
}

const translatorSlice = createSlice({
    name: 'translator',
    initialState,
    reducers: {
        setSentence: (state, action: PayloadAction<singleChar[]>) => {
            state.sentence = action.payload
        },
        setPrevSentence: (state, action: PayloadAction<singleChar[]>) => {
            state.prevSentence = action.payload
        },
        setTranslation: (state, action: PayloadAction<singleChar[]>) => {
            state.translation = action.payload
        },
        setPrevTranslation: (state, action: PayloadAction<singleChar[]>) => {
            state.prevTranslation = action.payload
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
        setTranslationRelationships: (state, action: PayloadAction<Object>) => {
            state.translationRelationships = action.payload
        },
        setPrevReversedArray: (state, action: PayloadAction<singleChar[]>) => {
            state.prevReversedArray = action.payload
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
        },
        setShouldAutoTranslate: (state, action: PayloadAction<boolean>) => {
            state.shouldAutoTranslate = action.payload
        }
    }
})

export const {setSentence, setPrevSentence, setTranslation, setPrevTranslation,
    setTranslationRelationships, setIsForbiddenKeyPressed, setHighlightedCouple,
    setIsFocused, setReversedArray, setIsWriting, setPrevReversedArray, setIsTranslationVisible,
    setTextToCheck, setCorrectIndexes, setAccuracy, setShouldShowResult, setShouldAutoTranslate
} = translatorSlice.actions;
export const selectTranslator = (state: RootState) => state.translator;
export default translatorSlice.reducer;