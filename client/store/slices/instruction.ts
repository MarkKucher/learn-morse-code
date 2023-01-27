import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

interface instructionState {
    shouldShowInstruction: boolean;
}

const initialState: instructionState = {
    shouldShowInstruction: false
}

const instructionSlice = createSlice({
    name: 'instruction',
    initialState,
    reducers: {
        setShouldShowInstruction(state, action: PayloadAction<boolean>) {
            state.shouldShowInstruction = action.payload
        }
    }
})

export const {setShouldShowInstruction} = instructionSlice.actions

export const selectInstruction = (state: RootState) => state.instruction

export default instructionSlice.reducer;