import { IssueInfo } from "./IssueInfo"

export type Columns = {
    ToDo: IssueInfo[],
    InProgress: IssueInfo[],
    Done: IssueInfo[],
}