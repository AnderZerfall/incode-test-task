import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IssueInfo } from '../../types/IssueInfo';
import { filterByStatus } from '../../utils/filterByStatus';
import { IssueStatus } from '../../types/IssueStatus';

export type ColumnIssue = {
    type: IssueStatus,
    issues: IssueInfo[],
}

export interface initialState {
    TO_DO: ColumnIssue,
    IN_PROGRESS: ColumnIssue,
    DONE: ColumnIssue,
}

const initialState: initialState = {
    TO_DO: {type: IssueStatus.TO_DO, issues: []},
    IN_PROGRESS: {type: IssueStatus.IN_PROGRESS, issues: []},
    DONE: {type: IssueStatus.DONE, issues: []},
}

export const IssuesSlice =  createSlice({
    name: 'issues',
    initialState,
    reducers: {
        setIssues: (state, { payload }: PayloadAction<IssueInfo[]>) => {
            (Object.keys(state) as Array<keyof initialState>).forEach(column => {
                state[column].issues = filterByStatus(payload, IssueStatus[column]);
            });
        },

        moveCard: (state, { payload }: PayloadAction<{ card: IssueInfo, newColumn: IssueStatus, hoverCard: IssueInfo}>) => {
            const { card, newColumn, hoverCard } = payload;
            console.log(newColumn);

            (Object.keys(state) as Array<keyof initialState>).forEach(column => {
                if (state[column].type === card.status) {
                    state[column].issues = deleteIssue(state[column].issues, card) 
                }
                
                if (state[column].type === newColumn) {
                    const index = state[column].issues.findIndex((i) => i.id === hoverCard.id);
                    const orderIndex =  card.order < index ? index + 1 : index;
                    const newCard = { ...card, status: newColumn};

                    state[column].issues.splice(orderIndex, 0, newCard);

                    state[column].issues = state[column].issues.map((issue, index) => ({
                        ...issue,
                        order: index,
                    }));
                }
            });
        },
        reorderCard: (state, { payload }: PayloadAction<{ card: IssueInfo, newColumn: IssueStatus, hoverCard: IssueInfo}>) => {
            const { card, newColumn, hoverCard } = payload;
            console.log(newColumn);

            (Object.keys(state) as Array<keyof initialState>).forEach(column => {
                if (state[column].type === card.status) {
                    state[column].issues = deleteIssue(state[column].issues, card) 
                }
                
                if (state[column].type === newColumn) {
                    const index = state[column].issues.findIndex((i) => i.id === hoverCard.id);
                    const orderIndex =  card.order < index ? index + 1 : index;
                    const newCard = { ...card, status: newColumn};

                    state[column].issues.splice(orderIndex, 0, newCard);

                    state[column].issues = state[column].issues.map((issue, index) => ({
                        ...issue,
                        order: index,
                    }));
                }
            });
        }
    }
})

export const selectAllIssues = (state: initialState, status: IssueStatus) => {
    const column = Object.values(state).find(column => column.type === status);
    return column ? column.issues : [];
};

const deleteIssue = (issues: IssueInfo[], issueToDelete: IssueInfo) => {
    return issues.filter(issue => issue.id !== issueToDelete.id)
}