

export enum PRIORITIES {
    Low = "low",
    Medium = "medium",
    High = "high",
}

export type SUBTASK = {
    taskId: string
    subText: string
    priority: PRIORITIES
}
