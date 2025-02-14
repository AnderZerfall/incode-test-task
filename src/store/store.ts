import { configureStore } from "@reduxjs/toolkit";
import { IssuesSlice } from '../features/github/issuesSlices';

export const store = configureStore({
    reducer: {
        issues: IssuesSlice.reducer,
    },
})