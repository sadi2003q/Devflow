import { PRIORITIES } from "@/types/subtask.type";

export enum STATUS {
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}

export type TASK = {
    projectId: string
    taskId: string
    title: string
    content: string
    createdAt: Date
    submissionDate: Date
    createdBy: string
    assignedTo: string[]
    tag?: string
    priority: PRIORITIES
    status: STATUS
    isComplete: boolean
    workQuality: number | null
}
