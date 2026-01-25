

export enum PRIORITIES {
    Low = "low",
    Medium = "medium",
    High = "high",
}

export type SUBTASK = {
    TaskID: string
    SubText: string
    priority: PRIORITIES
}
