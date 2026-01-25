import {TEAM_MEMBERS} from "@/types/teamMember.type";
import {SUBTASK} from "@/types/subtask.type";
import { PRIORITIES } from "@/types/subtask.type";

export enum STATUS {
    WORKING="WORKING",
    PENDING="PENDING",
    COMPLETED="COMPLETED"
}

export type TASK = {
    projectID: string
    taskID: string
    title: string
    content: string
    createdAt: Date
    submissionDate: Date
    createdBy: string
    assignedTo: TEAM_MEMBERS[]
    Tag?: string
    priority: PRIORITIES
    status: STATUS
    subtask?: SUBTASK[]
    isComplete: boolean
    workQuality: number | null
}

