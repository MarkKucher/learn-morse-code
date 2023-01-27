import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";


interface typingTypeState {
    isReversed: boolean;
}

const initialState: typingTypeState = {
    isReversed: false
}

const typingTypeSlice = createSlice({
    name: 'typingType',
    initialState,
    reducers: {
        setIsReversed: (state, action: PayloadAction<boolean>) => {
            state.isReversed = action.payload
        }
    }
})

export const {setIsReversed} = typingTypeSlice.actions;
export const selectTypingType = (state: RootState) => state.typingType;
export default typingTypeSlice.reducer;