import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../index";


interface showHeaderState {
    showHeader: boolean;
}

const initialState: showHeaderState = {
    showHeader: true
}

const showHeaderSlice = createSlice({
    name: 'showHeader',
    initialState,
    reducers: {
        toggleShowHeader: (state) => {
            state.showHeader = !state.showHeader
        }
    }
})

export const {toggleShowHeader} = showHeaderSlice.actions;
export const selectShowHeader = (state: RootState) => state.showHeader
export default showHeaderSlice.reducer;