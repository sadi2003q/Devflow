import {TEAM_MEMBERS} from "@/types/teamMember.type";
import {SUBTASK} from "@/types/subtask.type";
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
    assignedTo: TEAM_MEMBERS[]
    tag?: string
    priority: PRIORITIES
    status: STATUS
    subTasks?: SUBTASK[]
    isComplete: boolean
    workQuality: number | null
}
